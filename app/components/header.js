import React from 'react';

let Header = React.createClass({
	render() {
		const styles = {
			root: {
				width: '100%',
				backgroundColor: '#455a64',
				margin: '0px',
				padding: '0px',
			},
			background: {
				backgroundImage: 'url("img/stockholm.jpg")',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				textAlign: 'center',
				padding: '50px',
			},
			image: {
				width: '100px',
				height: '100px',
			},
			text: {
				fontSize: 48,
				color: '#fafafa',
				marginTop: '20px',
				fontFamily: 'Courier New',
				textShadow: '2px 2px #000000',
			},
		};

		return (
			<div 
				style={styles.root}
				className="page-header">
				<div 
					style={styles.background}>
					<img 
						style={styles.image} 
						src="img/m_logo.png" />
					<h1 
						style={styles.text}>
						Mattias Cederlund
					</h1>
				</div>
			</div>
		);
	}
});

export default Header;