import React from 'react';
import Paper from 'material-ui/lib/paper';
import {Link} from 'react-router';

let BlogSide = React.createClass({
    getAdminLink() {
        if (DEBUG) {
            return (
                <div>
                    <Link
                        to={'blogadmin'}>
                        Admin
                    </Link>
                    <br/>
                    <Link
                        to={'blog/this-is-an-error'}>
                        Not found
                    </Link>
                </div>
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
                This is the blog side.
                <br/>
                {this.getAdminLink()}
            </Paper>
        );
    }
});

export default BlogSide;