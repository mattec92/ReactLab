import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Helmet from "react-helmet";

import BlogEntryList from './entry/blogentrylist.js';
import BlogSide from './blogside.js';
import Blog from './blog.js'

let BlogList = React.createClass({
    getInitialState() {
        return {
            entries: [],
            error: false
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
                    entries: data,
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
        const styles = {
            list: {}
        };

        return (
            <Blog
                helmet={
                <Helmet
                    title="Blog"
                    meta={[
                        {"name": "description", "content": "The build a blog from scratch project. It's simple, I build a blog myself and write stuff about it, in it."},
                        {"property": "og:title", "content": "Blog | mattec.se"},
                        {"property": "og:description", "content": "The build a blog from scratch project. It's simple, I build a blog myself and write stuff about it, in it."}
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