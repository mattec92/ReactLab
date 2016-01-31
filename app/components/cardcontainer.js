import React from 'react';
import Card from './card.js';

let CardContainer = React.createClass({
	render() {
		const styles = {
			root: {
				width: '100%',
				padding: '50px',
			},
		};

		return (
			<div 
				style={styles.root}
				className="row">
				<Card 
					isFirst={true}
					imageDescription="LinkedIn logo"
					imageUrl="img/linkedin_logo.png"
					description="View my profile on LinkedIn."
					linkId="linkedinLink"
					linkText="Mattias Cederlund on LinkedIn"
					linkUrl="https://www.linkedin.com/in/mattiascederlund1" />
				<Card 
					isFirst={false}
					imageDescription="GitHub logo"
					imageUrl="img/github_logo.png"
					description="View my GitHub profile and the source code of this site."
					linkId="githubLink"
					linkText="Mattias Cederlund on GitHub"
					linkUrl="https://github.com/mattec92" />
				<Card 
					isFirst={false}
					imageDescription="Phoniac logo"
					imageUrl="img/phoniac_logo.png"
					description="Get my Android app - Phoniac - on Google Play."
					linkId="phoniacLink"
					linkText="Phoniac on Google Play"
					linkUrl="https://play.google.com/store/apps/details?id=se.mattec.phoniac" />
			</div>
		);
	}
});

export default CardContainer;