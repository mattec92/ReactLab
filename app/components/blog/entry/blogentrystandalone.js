import React from 'react';
import BlogEntry from './blogentry.js'

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
        $.ajax({
            url: 'http://localhost:8080/api/blog/' + this.props.params.id,//'/api/blog/' + this.props.params.id
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState({
                    entry: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('/api/blog/' + this.props.params.id, status, err.toString());
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
                <BlogEntry
                    id={this.props.params.id}
                    entry={this.state.entry}/>
            </div>
        );
    }
});

export default BlogEntryStandalone;