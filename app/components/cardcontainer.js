import React from 'react';
import Card from './card.js';

let CardContainer = React.createClass({
	render() {
		const styles = {
			root: {
				width: '100%',
				padding: '50px 50px 0px 50px'
			}
		};

		return (
			<div 
				style={styles.root}
				className="row">
				<div
					className="col-sm-2" />
				<Card 
					imageDescription="Phoniac logo"
					imageUrl="img/phoniac_logo.png"
					description="Get my Android app - Phoniac - on Google Play."
					linkId="phoniacLink"
					linkText="Phoniac on Google Play"
					linkUrl="https://play.google.com/store/apps/details?id=se.mattec.phoniac" />
				<Card 
					imageDescription="GitHub logo"
					imageUrl="img/github_logo.png"
					description="View my GitHub profile and the source code of this site."
					linkId="githubLink"
					linkText="Mattias Cederlund on GitHub"
					linkUrl="https://github.com/mattec92" />
				<div
					className="col-sm-2" />
			</div>
		);
	}
});

export default CardContainer;