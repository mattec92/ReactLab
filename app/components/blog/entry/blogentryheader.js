import React from 'react';
import {Link} from 'react-router';
import DateFormat from 'dateformat';

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

    buildDate() {
        const date = new Date(this.props.entry.date);
        return DateFormat(date, "yyyy-mm-dd, HH:MM");
    },

    render() {
        const styles = {
            container: {}
        };

        return (
            <div
                style={styles.container}>
                <p>
                    {this.buildDate()}
                </p>
                {this.buildTitle()}
            </div>
        );
    }
});

export default BlogEntryHeader;