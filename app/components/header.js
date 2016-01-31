import React from 'react';

let Header = React.createClass({
	render() {
		const styles = {
			root: {
				width: '100%',
				backgroundColor: '#455a64',
				margin: '0px',
				textAlign: 'center',
				padding: '20px',
			},
			image: {
				width: '100px',
				height: '100px',
			},
			text: {
				fontSize: 40,
				color: '#fafafa',
				marginTop: '10px',
				fontFamily: 'Courier New',
			},
		};

		return (
			<div 
				style={styles.root}
				className="page-header">
				<img 
					style={styles.image} 
					src="img/m_logo.png" />
				<h1 
					style={styles.text}>
					Mattias Cederlund
				</h1>
			</div>
		);
	}
});

export default Header;