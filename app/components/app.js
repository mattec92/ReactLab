import React from 'react';
import Footer from './footer.js';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import ImageIcon from './imageicon.js';

const SelectableList = SelectableContainerEnhance(List);

let App = React.createClass({

    isRoot(path) {
        return path === "/";
    },

    getAppBarColor(path) {
        return this.isRoot(path) ? 'rgba(0,0,0,0)' : '#00bcd4';
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
                minHeight: '100%'
            },
            appbar: {
                position: 'absolute',
                top: 0,
                backgroundColor: this.state.appbarColor,
                height: 64
            },
            content: {},
            footer: {}
        };

        const title =
            this.props.history.isActive('/phoniac') ? 'Phoniac' :
                this.props.history.isActive('/github') ? 'GitHub' : '';

        return (
            <div
                style={styles.root}>
                <div
                    style={styles.content}>
                    {this.props.children}
                </div>
                <AppBar
                    style={styles.appbar}
                    title={title}
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
                            value="/"
                            leftIcon={<ActionHome />}/>
                        <ListItem
                            primaryText="Phoniac"
                            value="/phoniac"
                            /*leftIcon={<ImageIcon icon="img/phoniac_logo.png"/>}*//>
                        <ListItem
                            primaryText="GitHub"
                            value="/github"/>
                    </SelectableList>
                </LeftNav>
                <Footer
                    style={styles.footer}/>
            </div>
        )
    }
});

export default App;