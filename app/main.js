import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/app.js';
import Home from './components/home/home.js';
import Phoniac from './components/feature/phoniac.js';
import Github from './components/feature/github.js';

injectTapEventPlugin();

ReactDOM.render((
    <Router history={createHashHistory({queryKey: false})}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Redirect from="home" to="/"/>
            <Route path="home" component={Home}/>
            <Route path="phoniac" component={Phoniac}/>
            <Route path="github" component={Github}/>
        </Route>
    </Router>
), document.getElementById('app'));