import React from 'react';
import Paper from 'material-ui/lib/paper';
import Typography from 'material-ui/lib/styles';
import {Link} from 'react-router';

let Card = React.createClass({
    getInitialState() {
        return {
            zDepth: 2
        };
    },

    _onMouseEnter() {
        this.setState({
            zDepth: 4
        });
    },

    _onMouseLeave() {
        this.setState({
            zDepth: 2
        });
    },

    render() {
        const styles = {
            root: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 50,
                textAlign: 'center',
                maxWidth: 500,
                backgroundColor: '#EEEEEE'
            },
            title: {
                padding: 20,
                margin: 0
            },
            image: {
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: 500,
                margin: 0
            }
        };

        return (
            <Paper
                style={styles.root}
                zDepth={this.state.zDepth}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}>
                <Link
                    to={this.props.path}>
                    <h2
                        style={styles.title}>
                        {this.props.title}
                    </h2>
                    <img
                        style={styles.image}
                        alt={this.props.imageDescription}
                        src={this.props.imageUrl}/>
                </Link>
            </Paper>
        );
    }
});

export default Card;