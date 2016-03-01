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
        if (this.props.entry) {
            return DateFormat(new Date(this.props.entry.date), "yyyy-mm-dd, HH:MM");
        }
        else {
            return '';
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
                    {this.buildDate()}
                </p>
                {this.buildTitle()}
            </div>
        );
    }
});

export default BlogEntryHeader;