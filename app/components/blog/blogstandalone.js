import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Helmet from "react-helmet";

import Blog from './blog.js';
import BlogEntry from './entry/blogentry.js'
import BlogEntryNotFound from './entry/blogentrynotfound.js';

let BlogStandalone = React.createClass({

    getInitialState() {
        return {
            entry: '',
            error: false
        };
    },

    componentDidMount() {
        this.loadBlogPost();
    },

    loadBlogPost() {
        const blogUrl = (DEBUG ? 'http://localhost:8080/api/blog/' : '/api/blog/') + this.props.params.id;

        $.ajax({
            url: blogUrl,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState({
                    entry: data,
                    error: false
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(blogUrl, status, err.toString());
                this.setState({
                    error: true
                });
            }.bind(this)
        });
    },

    render() {
        const styles = {};

        let description = "";
        let title = "";

        if (this.state.entry) {
            description = this.state.entry.body.substring(0, 100) + "...";
            title = this.state.entry.title + " | mattec.se";
        }

        let mainContent =
            <BlogEntry
                id={this.props.params.id}
                entry={this.state.entry}
                isStandalone={true}/>;

        if (this.state.error) {
            mainContent = <BlogEntryNotFound/>;
        }

        return (
            <Blog
                helmet={
                <Helmet
                    title={this.state.entry.title}
                    meta={[
                        {"name": "description", "content": description},
                        {"property": "og:title", "content": title},
                        {"property": "og:description", "content": description}
                    ]} />
                }
                main={
                mainContent
                }
                />
        );
    }
});

export default BlogStandalone;