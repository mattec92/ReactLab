import React from 'react';
import {Colors} from 'material-ui/lib/styles';

let BlogHeader = React.createClass({
    render() {
        const styles = {
            container: {
                backgroundColor: Colors.cyan500,
                padding: 50
            },
            text: {
                color: Colors.white,
                textAlign: 'Center',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };

        return (
            <div
                style={styles.container}>
                <h1
                    style={styles.text}>
                    Blog
                </h1>
            </div>
        );
    }
});

export default BlogHeader;