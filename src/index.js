import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Donuts from './components/Donuts';
import Viewer from './components/Viewer';
import { Provider } from 'react-redux';
import { configure as configureStore } from './state/store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="view" component={Viewer}/>
        <IndexRoute component={Donuts} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
