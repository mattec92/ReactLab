import React from 'react';
import BlogHeader from './blogheader.js';
import BlogEntryList from './blogentrylist.js';
import BlogSide from './blogside.js';
import {Row, Col} from 'react-bootstrap';

let Blog = React.createClass({
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
            container: {
                paddingTop: 64,
                width: '100%'
            },
            header: {
                padding: 50
            },
            entryContainer: {
                width: '100%'
            },
            list: {},
            side: {}
        };

        return (
            <div
                style={styles.container}>
                <BlogHeader
                    style={styles.header}/>
                    <Row
                        style={styles.entryContainer}>
                        <Col
                            sm={9}>
                            <BlogEntryList
                                entries={this.state.entries}
                                style={styles.list}/>
                        </Col>
                        <Col
                            sm={3}>
                            <BlogSide
                                style={styles.side}/>
                        </Col>
                    </Row>
            </div>
        );
    }
});

export default Blog;