import React from 'react';
import TextField from '../../../node_modules/material-ui/lib/text-field';
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';
import Typography from 'material-ui/lib/styles';
import Snackbar from 'material-ui/lib/snackbar';
import Popover from 'material-ui/lib/popover/popover';

let ContactForm = React.createClass({
    getInitialState() {
        return {
            email: '',
            subject: '',
            message: '',
            evaluatePt1: Math.floor((Math.random() * 10) + 1),
            evaluatePt2: Math.floor((Math.random() * 10) + 1),
            evaluateResult: '',
            snackbarOpen: false,
            snackbarMessage: '',
            popoverOpen: false
        };
    },

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    },

    handleSubjectChange(e) {
        this.setState({subject: e.target.value})
    },

    handleMessageChange(e) {
        this.setState({message: e.target.value})
    },

    handleEvaluationChange(e) {
        this.setState({
            evaluateResult: e.target.value
        });
    },

    sendEmail() {
        const postData = {
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
            evaluatePt1: this.state.evaluatePt1,
            evaluatePt2: this.state.evaluatePt2,
            evaluateResult: this.state.evaluateResult
        };

        $.ajax({
            url: '/api/contact',
            dataType: 'json',
            type: 'POST',
            data: postData,
            success: function (data) {
                this.openSnackbar('Success: ' + data.result);
                this.resetContactForm();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('/api/contact', status, err.toString());
                this.openSnackbar('Error: ' + err.error);
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

    generateNewEvaluation() {
        this.setState({
            evaluatePt1: Math.floor((Math.random() * 10) + 1),
            evaluatePt2: Math.floor((Math.random() * 10) + 1),
            evaluateResult: ''
        });
    },

    doLocalEvaluation() {
        if (!this.state.evaluateResult) {
            this.openSnackbar("You must answer the question to continue.");
        }
        else if ((this.state.evaluatePt1 + this.state.evaluatePt2) == parseInt(this.state.evaluateResult)) {
            this.closePopover();
            this.sendEmail();
            this.generateNewEvaluation();
        }
        else {
            this.openSnackbar("Evaluation failed, " + this.state.evaluatePt1 + " + " + this.state.evaluatePt2 + " is not '" + this.state.evaluateResult + "'.");
            this.generateNewEvaluation();
        }
    },

    doMessageEvaluation(e) {
        if (!this.state.email) {
            this.openSnackbar("Email must be supplied.");
        }
        else if (!this.state.subject) {
            this.openSnackbar("Subject must be supplied.");
        }
        else if (!this.state.message) {
            this.openSnackbar("Message must be supplied.");
        }
        //else if (!emailValid) { //TODO: Email evaluation
        //    this.openSnackbar("Email must be valid.");
        //}
        else {
            this.openPopover(e);
        }
    },

    render() {
        const styles = {
            root: {
                padding: '50px',
                textAlign: 'center'
            },
            header: {
                fontWeight: Typography.fontWeightLight,
                fontFamily: 'Roboto'
            },
            textField: {
                maxWidth: '600px'
            },
            button: {
                marginTop: '30px',
                marginBottom: '30px'
            },
            popover: {
                textAlign: 'center',
                padding: 20
            }
        };

        return (
            <div
                style={styles.root}
                className="col-sm-6">
                <h3
                    style={styles.header}>
                    Want to get in touch? Send me an email ...
                </h3>
                <TextField
                    style={styles.textField}
                    hintText="name@example.com"
                    floatingLabelText="Email Address"
                    onChange={this.handleEmailChange}/>
                <br/>
                <TextField
                    style={styles.textField}
                    hintText="Urgent message"
                    floatingLabelText="Subject"
                    onChange={this.handleSubjectChange}/>
                <br/>
                <TextField
                    style={styles.textField}
                    hintText="Dear Mattias, ..."
                    floatingLabelText="Message"
                    onChange={this.handleMessageChange}/>
                <br/>
                <RaisedButton
                    style={styles.button}
                    label="Send"
                    secondary={true}
                    onClick={this.doMessageEvaluation}/>
                <Popover
                    open={this.state.popoverOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.closePopover}>
                    <div
                        style={styles.popover}>
                        <p>
                            What is {this.state.evaluatePt1} + {this.state.evaluatePt2}?
                        </p>
                        <TextField
                            style={styles.textField}
                            onChange={this.handleEvaluationChange}
                            value={this.state.evaluateResult}
                            onEnterKeyDown={this.doLocalEvaluation}/>
                        <br/>
                        <RaisedButton
                            secondary={true}
                            label="Submit"
                            onClick={this.doLocalEvaluation}/>
                    </div>
                </Popover>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.closeSnackbar}/>
            </div>
        );
    }
});

export default ContactForm