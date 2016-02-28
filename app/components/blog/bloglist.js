import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Helmet from "react-helmet";

import BlogEntryList from './entry/blogentrylist.js';
import BlogSide from './blogside.js';
import Blog from './blog.js'

let BlogList = React.createClass({
    getInitialState() {
        return {
            entries: []
        };
    },

    componentDidMount() {
        this.loadBlogPosts();
    },

    loadBlogPosts() {
        const blogUrl = DEBUG ? 'http://localhost:8080/api/blog' : '/api/blog';

        $.ajax({
            url: blogUrl,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState({
                    entries: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(blogUrl, status, err.toString());
            }.bind(this)
        });
    },

    render() {
        const styles = {
            list: {}
        };

        return (
            <Blog
                helmet={
                <Helmet
                    title="Blog"
                    meta={[
                    ]} />
                }
                main={
                    <BlogEntryList
                        entries={this.state.entries}
                        style={styles.list}/>
                }
                />
        );
    }
});

export default BlogList;