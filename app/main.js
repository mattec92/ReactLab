import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router'
/*import createBrowserHistory from 'history/lib/createBrowserHistory'*/
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/app.js';

injectTapEventPlugin();

ReactDOM.render((
  <Router /*history={createBrowserHistory()}*/>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('app'));