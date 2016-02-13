import React from 'react';
import Paper from 'material-ui/lib/paper';

let BlogSide = React.createClass({
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
                This is the blog side.
            </Paper>
        );
    }
});

export default BlogSide;