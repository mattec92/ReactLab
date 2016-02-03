import React from 'react';
import Transitions from 'material-ui/lib/styles/transitions';

let ImageIcon = React.createClass({
    render() {
        const style = {
            display: 'inline-block',
            height: 24,
            width: 24,
            userSelect: 'none',
            transition: Transitions.easeOut(),
        };

        return (
            <img
                style={style}
                src={this.props.icon} />
        )
    }
});

export default ImageIcon;