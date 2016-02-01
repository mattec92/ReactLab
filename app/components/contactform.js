import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Typography from 'material-ui/lib/styles';

let ContactForm = React.createClass({
	getInitialState() {
    	return {
    		email: '', 
    		subject: '',
    		message: '',
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

  	handleSend() {
  		alert(this.state.email + " " + this.state.subject + " " + this.state.message);
  	},

	render() {
		const styles = {
			root: {
				padding: '50px',
                textAlign: 'center',
			},
			header: {
        		fontWeight: Typography.fontWeightLight,
                fontFamily: 'Roboto',
			},
			textField: {
				maxWidth: '600px',
			},
			button: {
				marginTop: '30px',
				marginBottom: '30px',
			},
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
      				onClick={this.handleSend} />
			</div>
		);
	}
});

export default ContactForm