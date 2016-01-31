import React from 'react';
import Colors from 'material-ui/lib/styles'

let Footer = React.createClass({
	render() {
		const styles = {
			root: {
				width: '100%',
				textAlign: 'center',
				padding: '20px',
				backgroundColor: '#212121',
			},
			text: {
				color: '#FFFFFF',
				fontSize: 14,
        		lineHeight: '22px',
			},
			image: {
				width: '32px',
				height: '32px',
				marginTop: '10px',
			},
		};

		var currentYear = new Date().getFullYear();
		
		return (
			<footer 
				style={styles.root}
				className="footer">
				<p
					style={styles.text}>
					Mattias Cederlund, {currentYear}
				</p>
				<a 
					href="https://github.com/mattec92/ReactLab"
					target="_blank">
					<img 
						style={styles.image}
						src="img/github_logo_light_32.png"
						alt="Github logo"  />
				</a>
			</footer>
		);
	}
});

export default Footer;