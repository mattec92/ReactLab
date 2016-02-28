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

        return (
            <Blog
                helmet={
                <Helmet
                    title={this.state.entry.title}
                    meta={[
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