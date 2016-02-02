import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Typography from 'material-ui/lib/styles';
import SvgIcon from 'material-ui/lib/svg-icon';

let LinkedInContainer = React.createClass({
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
			imageContainer: {
				width: '150px',
				height: '150px',
    			borderRadius: '150px',
    			overflow: 'hidden',
				marginTop: '20px',
				marginLeft: 'auto',
				marginRight: 'auto'
			},
			image: {
				width: '150px',
				height: '150px'
			},
			text: {
				marginTop: '20px'
			},
			button: {
				marginTop: '30px',
				marginBottom: '30px'
			}
		};

		return (
			<div 
				style={styles.root}
				className="col-sm-6">
				<h3
					style={styles.header}>
					... or contact me on LinkedIn.
				</h3>
				<div
					style={styles.imageContainer}>
					<img
						style={styles.image}
						src="img/portrait.jpg"
						alt="Mattias Cederlund portrait" />
				</div>
				<p
					style={styles.text}>
					View my profile on LinkedIn.
				</p>
      			<RaisedButton 
					style={styles.button}
      				label="Mattias Cederlund on LinkedIn"
          			linkButton={true}
          			secondary={true}
      				href="https://www.linkedin.com/in/mattiascederlund1" />
			</div>
		);
	}
});

export default LinkedInContainer;