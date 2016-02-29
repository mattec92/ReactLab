import React from 'react';

let BlogEntryFooter = React.createClass({
    render() {
        const styles = {
            container: {}
        };

        return (
            <div
                style={styles.container}>
                <h4>
                    {this.props.entry.author}
                </h4>
            </div>
        );
    }
});

export default BlogEntryFooter;