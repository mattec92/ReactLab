import React from 'react';
import BlogEntryHeader from './blogentryheader.js';
import BlogEntryFooter from './blogentryfooter.js';

let BlogEntry = React.createClass({
    render() {
        const styles = {
            container: {}
        };

        return (
            <div
                style={styles.container}>
                This is the blog entry with id {this.props.id}.
                <BlogEntryHeader />

                <h1>
                    {this.props.entry.title}
                </h1>

                <h3>
                    {this.props.entry.date}
                </h3>

                <p>
                    {this.props.entry.body}
                </p>

                <h3>
                    {this.props.entry.author}
                </h3>
                <BlogEntryFooter />
            </div>
        );
    }
});

export default BlogEntry;