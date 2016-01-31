import React from 'react';
import Header from './header.js';
import Lead from './lead.js';
import CardContainer from './cardcontainer.js';
import ContactContainer from './contactcontainer.js';
import Footer from './footer.js';

let App = React.createClass({
	render() {
	    return (
		    <div>
		    	<Header />
				<Lead />
				<CardContainer /> 
				<ContactContainer />
		    	<Footer />
		    </div>
	    )
  	}
});

export default App;