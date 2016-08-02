import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Donuts from './components/Donuts';
import Editor from './components/Editor';
import About from './components/About';
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
        <IndexRoute component={Donuts} />
        <Route path="donuts/:id" component={Editor} />
        <Route path="donuts/new" component={Editor} />
        <Route path="about" component={About}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
