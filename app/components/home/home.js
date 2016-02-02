import React from 'react';
import Header from './header.js';
import Lead from './lead.js';
import CardContainer from './cardcontainer.js';
import ContactContainer from './contactcontainer.js';

let Home = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <Lead />
                <CardContainer />
                <ContactContainer />
            </div>
        )
    }
});

export default Home;