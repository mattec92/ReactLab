import React from 'react';
import Typography from 'material-ui/lib/styles';

let Lead = React.createClass({
	render() {
		const styles = {
			container: {
				width: '100%',
				backgroundColor: '#EEEEEE',
			   	padding: '50px',
			},
			text: {
				textAlign: 'center',
        		fontWeight: Typography.fontWeightLight,
				fontFamily: 'Roboto',
			},
		};

		return (
			<div 
				style={styles.container}>
				<h3 
					style={styles.text}>
					This is the lead text. Insert something appropriate here!
				</h3>
			</div>
		);
	}
});

export default Lead;