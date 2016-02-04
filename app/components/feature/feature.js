import React from 'react';
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';

let Feature = React.createClass({
        render() {
            const styles = {
                root: {
                    paddingTop: 64 + 50,
                    paddingBottom: 50,
                    paddingLeft: 50,
                    paddingRight: 50,
                    maxWidth: 1124,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    textAlign: 'center'
                },
                image: {
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: 500
                },
                text: {
                    textAlign: 'center',
                    fontSize: 20,
                    marginTop: 20,
                    marginBottom: 20
                },
                button: {}
            };

            return (
                <div
                    style={styles.root}>
                    <img
                        style={styles.image}
                        src={this.props.image}/>
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
            )
        }
    })
    ;

export default Feature;