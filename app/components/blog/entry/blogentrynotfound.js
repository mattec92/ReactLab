import React from 'react';
import Paper from 'material-ui/lib/paper';
import {Link} from 'react-router';

let BlogEntryNotFound = React.createClass({
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
                <h1>
                    Whoops!
                </h1>

                <h3>
                    This page was not found.
                </h3>

                <Link
                    to="/blog">
                    Return to the blog
                </Link>
            </Paper>
        );
    }
});

export default BlogEntryNotFound;