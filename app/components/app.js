import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import Helmet from "react-helmet";

import Footer from './footer.js';

const SelectableList = SelectableContainerEnhance(List);

let App = React.createClass({

    componentDidMount() {
        this.updateAppBar(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.updateAppBar(nextProps);
    },

    updateAppBar(props) {
        this.setState({
            appbarColor: this.getAppBarColor(props.location.pathname)
        });
    },

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
        this.setState({
            open: !this.state.open
        });
    },

    handleRequestChangeList(event, value) {
        this.props.history.push(value);
        this.setState({
            open: false
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
                this.props.history.isActive('/github') ? 'GitHub' :
                    this.props.history.isActive('/blog') ? 'Blog' : '';

        return (
            <div
                style={styles.root}>
                <Helmet
                    title="Mattias Cederlund"
                    titleTemplate="%s | mattec.se"
                    meta={[
                        {"name" : "author", "content": "Mattias Cederlund"},
                        {"name": "description", "content": "Welcome to my React playground. This is where I try new, cool technologies and showcase what I have done so far. Phoniac - Github - Blog"},
                        {"property": "og:description", "content": "Welcome to my React playground. This is where I try new, cool technologies and showcase what I have done so far. Phoniac - Github - Blog"},
                        {"property": "og:title", "content": "Mattias Cederlund | mattec.se"},
                        {"property": "og:type", "content": "website"},
                        {"property": "og:image", "content": "https://mattec.se/img/m_logo.png"},
                        {"property": "og:url", "content": 'https://mattec.se' + this.props.location.pathname}
                    ]}/>

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
                            value="/phoniac"/>
                        <ListItem
                            primaryText="GitHub"
                            value="/github"/>
                        <ListItem
                            primaryText="Blog"
                            value="/blog"/>
                    </SelectableList>
                </LeftNav>
                <Footer
                    style={styles.footer}/>
            </div>
        )
    }
});

export default App;