import React from 'react';
import Typography from 'material-ui/lib/styles';

let Lead = React.createClass({
    render() {
        const styles = {
            container: {
                width: '100%',
                backgroundColor: '#EEEEEE',
                padding: '50px'
            },
            text: {
                textAlign: 'center',
                fontWeight: Typography.fontWeightLight,
                fontFamily: 'Roboto',
                maxWidth: 800,
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };

        return (
            <div
                style={styles.container}>
                <h3
                    style={styles.text}>
                    Welcome to my React playground. This is where I try new, cool technologies and showcase what I have
                    done so far.
                </h3>
            </div>
        );
    }
});

export default Lead;