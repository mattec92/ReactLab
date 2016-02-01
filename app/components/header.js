import React from 'react';

let Header = React.createClass({
	getInitialState() {
    	return {
  			attributionOpacity: 0.0,
    	};
  	},

  	setAttributionVisible() {
  		this.setState({
  			attributionOpacity: 1.0,
  		});
  	},

  	setAttributionGone() {
  		this.setState({
  			attributionOpacity: 0.0,
  		});
  	},

	render() {
		const styles = {
			root: {
				width: '100%',
				backgroundColor: '#455a64',
				margin: '0px',
				padding: '0px',
				position: 'relative',
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
			attribution: {
				position: 'absolute',
				bottom: '0',
				right: '0',
				fontSize: 12,
				color: '#FFFFFF',
				textAlign: 'right',
				opacity: this.state.attributionOpacity,
			},
			attributionLink: {
				fontSize: 12,
				color: '#FFFFFF'
			},
		};

		return (
			<div 
				style={styles.root}
				className="page-header"
	       		onMouseEnter={this.setAttributionVisible}
	        	onMouseLeave={this.setAttributionGone}>
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
				<div
					style={styles.attribution}>
					<p>
						Photo credit: <a style={styles.attributionLink} href="https://www.flickr.com/photos/120374925@N06/22078903601/" target="_blank">magnus.johansson10</a> 
						<br/>
						Licence: <a style={styles.attributionLink} href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC BY-SA</a>
						<br/>
						The image was cropped.
					</p>
				</div>
			</div>
		);
	}
});

export default Header;