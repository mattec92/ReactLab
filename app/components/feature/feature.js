import React from 'react';
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';

let Feature = React.createClass({
    render() {
        const styles = {
            root: {
                paddingTop: 64
            },
            image: {

            },
            descriptionContainer: {

            },
            logo: {

            },
            text: {

            },
            button: {

            }
        };

        return (
            <div
                style={styles.root}>
                <h1>
                    {this.props.title}
                </h1>
                <img
                    styles={styles.image}
                    src={this.props.image}/>

                <div
                    styles={styles.descriptionContainer}>
                    <img
                        styles={styles.logo}
                        src={this.props.logo}/>

                    <div>
                        <p
                            style={styles.text}>
                            {this.props.promoText}
                        </p>
                        <RaisedButton
                            style={styles.button}
                            label={this.props.linkText}
                            linkButton={true}
                            secondary={true}
                            href={this.props.linkUrl}/>
                    </div>
                </div>
            </div>
        )
    }
});

export default Feature;