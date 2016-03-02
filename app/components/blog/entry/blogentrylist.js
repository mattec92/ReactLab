import React from 'react';

import BlogEntry from './blogentry.js';

let BlogEntryList = React.createClass({
    render() {
        let blogEntries = this.props.entries.map(function (blogEntry) {
            return (
                <BlogEntry
                    id={blogEntry.id}
                    key={blogEntry.id}
                    entry={blogEntry}
                    isStandalone={false}/>
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