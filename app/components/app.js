import React from 'react';
import Footer from './footer.js';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

const SelectableList = SelectableContainerEnhance(List);

let App = React.createClass({

    getAppBarColor(path) {
        if (path === "/") {
            return 'rgba(0,0,0,0)';
        }
        else {
            return '#00bcd4';
        }
    },

    getInitialState() {
        return {
            open: false,
            appbarColor: this.getAppBarColor(this.props.location.pathname)
        };
    },

    toggleLeftNav() {
        this.setState({open: !this.state.open});
    },

    handleRequestChangeList(event, value) {
        this.props.history.push(value);
        this.setState({
            open: false,
            appbarColor: this.getAppBarColor(value)
        });
    },

    render() {
        const styles = {
            root: {
                position: 'relative',
            },
            appbar: {
                position: 'absolute',
                top: 0,
                backgroundColor: this.state.appbarColor
            },
            footer: {
                position: 'absolute',
                bottom: 0
            }
        };

        return (
            <div
                style={styles.root}>
                {this.props.children}
                <Footer
                    style={styles.footer}/>
                <AppBar
                    style={styles.appbar}
                    zDepth={0}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleLeftNav}/>
                <LeftNav
                    docked={false}
                    open={this.state.open}
                    onRequestChange={open => this.setState({open})}>
                    <SelectableList
                        valueLink={{
                            value: this.props.location.pathname,
                            requestChange: this.handleRequestChangeList}}>
                        <ListItem
                            primaryText="Home"
                            value="/"/>
                        <ListItem
                            primaryText="Phoniac"
                            value="/phoniac"/>
                        <ListItem
                            primaryText="GitHub"
                            value="/github"/>
                    </SelectableList>
                </LeftNav>
            </div>
        )
    }
});

export default App;