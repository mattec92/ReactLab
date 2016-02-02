import React from 'react';
import Paper from 'material-ui/lib/paper';
import Typography from 'material-ui/lib/styles';

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
                padding: '50px',
                marginBottom: '50px',
                textAlign: 'center'
            },
            logo: {
                width: '60px',
                height: '60px'
            },
            description: {
                marginTop: '20px'
            },
            link: {
                marginTop: '20px'
            }
        };

        return (
            <div
                className="col-sm-4">
                <Paper
                    style={styles.root}
                    zDepth={this.state.zDepth}
                    onMouseEnter={this._onMouseEnter}
                    onMouseLeave={this._onMouseLeave}>
                    <img
                        style={styles.logo}
                        alt={this.props.imageDescription}
                        src={this.props.imageUrl}/>

                    <p
                        style={styles.description}>
                        {this.props.description}
                    </p>
                    <a
                        style={styles.link}
                        id={this.props.linkId}
                        href={this.props.linkUrl}
                        target="_blank">
                        {this.props.linkText}
                    </a>
                </Paper>
            </div>
        );
    }
});

export default Card;