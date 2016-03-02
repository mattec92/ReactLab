import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Helmet from "react-helmet";

import Blog from './blog.js';
import BlogEntry from './entry/blogentry.js'

let BlogStandalone = React.createClass({

    getInitialState() {
        return {
            entry: ''
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
                    entry: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(blogUrl, status, err.toString());
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
                    <BlogEntry
                        id={this.props.params.id}
                        entry={this.state.entry}
                        isStandalone={true}/>
                }
                />
        );
    }
});

export default BlogStandalone;