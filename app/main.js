import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ga from 'react-ga';
import App from './components/app.js';
import Home from './components/home/home.js';
import Phoniac from './components/feature/phoniac.js';
import Github from './components/feature/github.js';

injectTapEventPlugin();

var options = { debug: true };
ga.initialize('UA-49525518-5', options);

let history = createHashHistory({queryKey: false});

history.listen(location => {
    ga.pageview(location.pathname);
});

const routes = (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Redirect from="home" to="/"/>
            <Route path="home" component={Home}/>
            <Route path="phoniac" component={Phoniac}/>
            <Route path="github" component={Github}/>
        </Route>
    </Router>
);

ReactDOM.render((
    routes
), document.getElementById('app'));