import React from 'react';
import Header from './header.js';
import Lead from './lead.js';
import CardContainer from './cardcontainer.js';
import ContactContainer from './contactcontainer.js';
import Helmet from "react-helmet";

let Home = React.createClass({
    render() {
        return (
            <div>
                <Helmet
                    title="Home"
                    meta={[
                    ]} />
                <Header />
                <Lead />
                <CardContainer />
                <ContactContainer />
            </div>
        )
    }
});

export default Home;