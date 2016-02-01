import React from 'react';
import Body from './body.js';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

let App = React.createClass({	
	getInitialState() {
    	return {
    		open: false,
    	};
  	},

	toggleLeftNav() {
		this.setState({open: !this.state.open});
	},

	render() {
		const styles = {
			root: {
				position: 'relative',
			},
			appbar: {
				position: 'absolute',
				top: 0,
				backgroundColor: 'rgba(0,0,0,0)',
			},
			body: {
				position: 'absolute',
				top: 0,
			},
		};

	    return (
		    <div
		    	style={styles.root}>
    			<Body 
    				style={styles.body}/>
		    	<AppBar
		    		style={styles.appbar}
					zDepth={0}
    				iconClassNameRight="muidocs-icon-navigation-expand-more"
    				onLeftIconButtonTouchTap={this.toggleLeftNav}/>
        		<LeftNav 
        			docked={false}
					open={this.state.open}
					onRequestChange={open => this.setState({open})}>
					<MenuItem>
						Start
					</MenuItem>
					<MenuItem>
						Menu Item 1
					</MenuItem>
					<MenuItem>
						Menu Item 2
					</MenuItem>
					<MenuItem>
						Menu Item 3
					</MenuItem>
				</LeftNav>
		    </div>
	    )
  	}
});

export default App;