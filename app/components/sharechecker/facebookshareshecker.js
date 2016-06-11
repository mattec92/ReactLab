import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

let FacebookShareChecker = React.createClass({
    getInitialState() {
        return {
            url: 'http://',
            result: '',
            showResults: false,
            errorText: '',
            errorMessage: ''
        };
    },

    handleUrlChange(e) {
        this.setState({
            url: e.target.value
        })
    },

    handleSendClick() {
        if (this.state.url.length > 0 && (this.state.url.indexOf('http://') >= 0 || this.state.url.indexOf('https://') >= 0)) {
            this.requestStats();
        }
        else {
            this.setState({
                result: undefined,
                errorText: 'URL must not be empty and begin with http:// or https://.',
                errorMessage: ''
            });
        }
    },

    requestStats() {
        const url = 'http://graph.facebook.com/' + this.state.url;

        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState({
                    result: data,
                    showResults: true,
                    errorText: '',
                    errorMessage: ''
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
                this.setState({
                    result: undefined,
                    errorText: 'Problem fetching data from Facebook.',
                    errorMessage: JSON.parse(xhr.responseText).error.message
                });
            }.bind(this)
        });
    },

    getResultText() {
        return this.state.result ? this.state.result.id + ' has ' + (this.state.result.shares ? this.state.result.shares : 0) + ' shares.' : '';
    },

    render() {
        const styles = {
            root: {
                height: '100vh',
                margin: 0,
                padding: 50,
                textAlign: 'center',
                backgroundColor: '#3b5998'
            },
            textField: {
                color: '#ffffff'
            },
            button: {
                marginLeft: 30
            },
            result: {
                margin: 50
            },
            resultText: {
                color: '#ffffff'
            },
            errorMessage: {
                color: '#ffffff'
            }
        };

        return (
            <div
                style={styles.root}>
                <TextField
                    inputStyle={styles.textField}
                    hintText="http://www.example.com"
                    floatingLabelText="URL to lookup"
                    floatingLabelStyle={{color: '#ffffff'}}
                    hintStyle={{color: '#bbbbbb'}}
                    underlineStyle={{borderColor: '#bbbbbb'}}
                    underlineFocusStyle={{borderColor: '#ffffff'}}
                    value={this.state.url}
                    onChange={this.handleUrlChange}/>
                <FlatButton
                    style={styles.button}
                    label="Send"
                    secondary={true}
                    labelStyle={{color:'#ffffff'}}
                    onClick={this.handleSendClick}/>
                {this.state.showResults ?
                    <div
                        style={styles.result}>
                        <h2
                            style={styles.resultText}>
                            {this.getResultText()}
                        </h2>
                    </div>
                    : null}
                <div
                    style={styles.result}>
                    <h2
                        style={styles.resultText}>
                        {this.state.errorText}
                    </h2>
                    <br/>
                    <p
                        style={styles.errorMessage}>
                        {this.state.errorMessage}
                    </p>
                </div>
            </div>
        );
    }
});

export default FacebookShareChecker;