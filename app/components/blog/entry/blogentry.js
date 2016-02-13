import React from 'react';
import BlogEntryHeader from './blogentryheader.js';
import BlogEntryFooter from './blogentryfooter.js';
import Paper from 'material-ui/lib/paper';
import {Link} from 'react-router';

let BlogEntry = React.createClass({
    buildTitle() {
        if (this.props.isStandalone) {
            return (
                <h1>
                    {this.props.entry.title}
                </h1>
            );
        }
        else {
            return (
                <Link
                    to={'blog/' + this.props.entry.id}>
                    <h1>
                        {this.props.entry.title}
                    </h1>
                </Link>
            );
        }
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
                <BlogEntryHeader />

                {this.buildTitle()}

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
            </Paper>
        );
    }
});

export default BlogEntry;