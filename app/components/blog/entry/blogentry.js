import React from 'react';
import Paper from 'material-ui/lib/paper';
import {Link} from 'react-router';
import marked from 'marked';

import BlogEntryHeader from './blogentryheader.js';
import BlogEntryFooter from './blogentryfooter.js';

let BlogEntry = React.createClass({
    getMarkup() {
        var markup = marked(this.props.entry.body, {sanitize: true});
        return {__html: markup};
    },

    render() {
        const styles = {
            root: {
                margin: 20,
                padding: 20
            }
        };

        return (
            <Paper
                style={styles.root}
                zDepth={2}>
                <BlogEntryHeader
                    entry={this.props.entry}
                    isStandalone={this.props.isStandalone}/>
                <span dangerouslySetInnerHTML={this.getMarkup()}/>
                <BlogEntryFooter
                    entry={this.props.entry}/>
            </Paper>
        );
    }
});

export default BlogEntry;