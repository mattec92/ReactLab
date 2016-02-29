import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect} from 'react-router'
import createHashHistory from 'history/lib/createHashHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ga from 'react-ga';
import App from './components/app.js';
import Home from './components/home/home.js';
import Phoniac from './components/feature/phoniac.js';
import Github from './components/feature/github.js';
import BlogList from './components/blog/bloglist.js';
import BlogStandalone from './components/blog/blogstandalone.js';
import BlogAdmin from './components/blog/admin/blogadmin.js';

injectTapEventPlugin();

const options = {debug: DEBUG};
ga.initialize('UA-49525518-5', options);

let history;

if (DEBUG) {
    history = createHashHistory({queryKey: false});
}
else {
    history = createBrowserHistory();
}

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
            <Route path="blog" component={BlogList}/>
            <Route path="blog/:id" component={BlogStandalone}/>
            <Route path="blogadmin" component={BlogAdmin}/>
        </Route>
    </Router>
);

ReactDOM.render((
    routes
), document.getElementById('app'));