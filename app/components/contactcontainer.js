import React from 'react';
import LinkedInContainer from './linkedincontainer.js'
import ContactForm from './contactform.js'

let ContactContainer = React.createClass({
	render() {
		const styles = {
			root: {
			   	width: '100%',
				backgroundColor: '#EEEEEE',
    		},
		};

		return (
			<div
				style={styles.root}
				className="row">
				<ContactForm/>
				<LinkedInContainer/>
			</div>
		);
	}
});

export default ContactContainer;