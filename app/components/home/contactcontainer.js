import React from 'react';
import LinkedInContainer from './linkedincontainer.js'
import ContactForm from './contactform.js'
import {Row, Col} from 'react-bootstrap';

let ContactContainer = React.createClass({
    render() {
        const styles = {
            root: {
                width: '100%',
                margin: '0px',
                padding: '0px',
                backgroundColor: '#EEEEEE'
            }
        };

        return (
                <Row
                    style={styles.root}>
                    <Col
                        sm={6}>
                        <ContactForm/>
                    </Col>
                    <Col
                        sm={6}>
                        <LinkedInContainer/>
                    </Col>
                </Row>
        );
    }
});

export default ContactContainer;