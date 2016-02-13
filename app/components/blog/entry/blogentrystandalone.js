import React from 'react';
import BlogEntry from './blogentry.js'
import Helmet from "react-helmet";

let BlogEntryStandalone = React.createClass({
    getInitialState() {
        return {
            entry: []
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
        const styles = {
            container: {
                paddingTop: 64
            }
        };

        return (
            <div
                style={styles.container}>
                <Helmet
                    title={this.state.entry.title}
                    meta={[
                    ]} />
                <BlogEntry
                    id={this.props.params.id}
                    entry={this.state.entry}
                    isStandalone={true}/>
            </div>
        );
    }
});

export default BlogEntryStandalone;