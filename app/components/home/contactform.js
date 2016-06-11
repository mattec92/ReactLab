import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Typography from 'material-ui/lib/styles';
import Snackbar from 'material-ui/lib/snackbar';
import Popover from 'material-ui/lib/popover/popover';

let ContactForm = React.createClass({
    getInitialState() {
        return {
            email: '',
            subject: '',
            message: '',
            validationPt1: Math.floor((Math.random() * 10) + 1),
            validationPt2: Math.floor((Math.random() * 10) + 1),
            validationResult: '',
            snackbarOpen: false,
            snackbarMessage: '',
            popoverOpen: false
        };
    },

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    },

    handleSubjectChange(e) {
        this.setState({
            subject: e.target.value
        })
    },

    handleMessageChange(e) {
        this.setState({
            message: e.target.value
        })
    },

    handleValidationChange(e) {
        this.setState({
            validationResult: e.target.value
        });
    },

    sendEmail() {
        const postData = {
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
            validationPt1: this.state.validationPt1,
            validationPt2: this.state.validationPt2,
            validationResult: this.state.validationResult
        };

        const contactUrl = DEBUG ? 'http://localhost:8080/api/contact' : '/api/contact';

        $.ajax({
            url: contactUrl,
            dataType: 'json',
            type: 'POST',
            data: postData,
            success: function (data) {
                this.openSnackbar(data.result);
                this.resetContactForm();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(contactUrl, status, err.toString());
                this.openSnackbar('Failed to send message, try again later or use another contact option.');
            }.bind(this)
        });
    },

    resetContactForm() {
        this.setState({
            email: '',
            subject: '',
            message: ''
        });
    },

    openPopover(event) {
        this.setState({
            popoverOpen: true,
            anchorEl: event.currentTarget
        });
    },

    closePopover() {
        this.setState({
            popoverOpen: false
        });
    },

    openSnackbar(message) {
        this.setState({
            snackbarOpen: true,
            snackbarMessage: message
        });
    },

    closeSnackbar() {
        this.setState({
            snackbarOpen: false
        });
    },

    generateNewValidation() {
        this.setState({
            validationPt1: Math.floor((Math.random() * 10) + 1),
            validationPt2: Math.floor((Math.random() * 10) + 1),
            validationResult: ''
        });
    },

    doLocalValidation() {
        if (!this.state.validationResult) {
            this.openSnackbar("You must answer the question to continue.");
        }
        else if ((this.state.validationPt1 + this.state.validationPt2) == parseInt(this.state.validationResult)) {
            this.closePopover();
            this.sendEmail();
            this.generateNewValidation();
        }
        else {
            this.openSnackbar("Wrong answer, " + this.state.validationPt1 + " + " + this.state.validationPt2 + " is not '" + this.state.validationResult + "'.");
            this.generateNewValidation();
        }
    },

    doMessageValidation(e) {
        if (!this.state.email) {
            this.openSnackbar("Email address must be supplied.");
            return;
        }

        if (!this.state.subject) {
            this.openSnackbar("Subject must be supplied.");
            return;
        }
        if (!this.state.message) {
            this.openSnackbar("Message must be supplied.");
            return;
        }

        const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        if (!emailRegex.test(this.state.email)) {
            this.openSnackbar("Email must be valid.");
            return;
        }

        this.openPopover(e);
    },

    render() {
        const styles = {
            root: {
                padding: 50,
                textAlign: 'center'
            },
            header: {
                fontWeight: Typography.fontWeightLight,
                fontFamily: 'Roboto'
            },
            textField: {
                maxWidth: 600
            },
            button: {
                marginTop: 30,
                marginBottom: 30
            },
            popover: {
                textAlign: 'center',
                padding: 20
            },
            popoverButton: {
                marginTop: 10
            }
        };

        return (
            <div
                style={styles.root}>
                <h3
                    style={styles.header}>
                    Want to get in touch? Send me a message ...
                </h3>
                <TextField
                    style={styles.textField}
                    hintText="name@example.com"
                    floatingLabelText="Email Address"
                    value={this.state.email}
                    onChange={this.handleEmailChange}/>
                <br/>
                <TextField
                    style={styles.textField}
                    hintText="Urgent message"
                    floatingLabelText="Subject"
                    value={this.state.subject}
                    onChange={this.handleSubjectChange}/>
                <br/>
                <TextField
                    style={styles.textField}
                    hintText="Dear Mattias, ..."
                    floatingLabelText="Message"
                    value={this.state.message}
                    onChange={this.handleMessageChange}/>
                <br/>
                <RaisedButton
                    style={styles.button}
                    label="Send"
                    secondary={true}
                    onClick={this.doMessageValidation}/>
                <Popover
                    open={this.state.popoverOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.closePopover}>
                    <div
                        style={styles.popover}>
                        <p>
                            What is {this.state.validationPt1} + {this.state.validationPt2}?
                        </p>
                        <TextField
                            value={this.state.validationResult}
                            onChange={this.handleValidationChange}
                            onEnterKeyDown={this.doLocalValidation}/>
                        <br/>
                        <RaisedButton
                            style={styles.popoverButton}
                            secondary={true}
                            label="Confirm send"
                            onClick={this.doLocalValidation}/>
                    </div>
                </Popover>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={3000}
                    onRequestClose={this.closeSnackbar}/>
            </div>
        );
    }
});

export default ContactForm;