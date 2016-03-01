import React from 'react';
import {Link} from 'react-router';

let BlogEntryHeader = React.createClass({
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
                    to={'/blog/' + this.props.entry.id}>
                    <h1>
                        {this.props.entry.title}
                    </h1>
                </Link>
            );
        }
    },

    render() {
        const styles = {
            container: {}
        };

        return (
            <div
                style={styles.container}>
                <p>
                    {this.props.entry.date}
                </p>
                {this.buildTitle()}
            </div>
        );
    }
});

export default BlogEntryHeader;