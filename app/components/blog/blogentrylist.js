import React from 'react';
import BlogEntry from './entry/blogentry.js';

let BlogEntryList = React.createClass({
    render() {
        let blogEntries = this.props.entries.map(function (blogEntry) {
            return (
                <BlogEntry
                    id={blogEntry.id}
                    entry={blogEntry}/>
            );
        });

        return (
            <div>
                {blogEntries}
            </div>
        );
    }
});

export default BlogEntryList;