import React from 'react';
import Colors from 'material-ui/lib/styles'

let Footer = React.createClass({
    getInitialState() {
        return {
            scale: 'scale(1.0)'
        };
    },

    _onMouseEnter() {
        this.setState({
            scale: 'scale(1.2)'
        });
    },

    _onMouseLeave() {
        this.setState({
            scale: 'scale(1.0)'
        });
    },

    render() {
        const styles = {
            root: {
                width: '100%',
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#212121'
            },
            text: {
                color: '#FFFFFF',
                fontSize: 14,
                lineHeight: '22px'
            },
            image: {
                width: '32px',
                height: '32px',
                marginTop: '10px',
                transform: this.state.scale
            }
        };

        const currentYear = new Date().getFullYear();

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
                    target="_blank"
                    onMouseEnter={this._onMouseEnter}
                    onMouseLeave={this._onMouseLeave}>
                    <img
                        style={styles.image}
                        src="img/github_logo_light_64.png"
                        alt="Github logo"/>
                </a>
            </footer>
        );
    }
});

export default Footer;