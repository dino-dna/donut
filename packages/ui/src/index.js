import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import Donuts from './containers/Donuts'
import Create from './containers/Create'
import About from './components/About'
import Admin from './components/Admin'
import DeepFryer from './containers/DeepFryer'
import { Provider } from 'react-redux'
import { configure as configureStore } from './state/store'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import './index.css'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Donuts} />
        <Route path='create' component={Create} />
        <Route path='about' component={About} />
        <Route path='admin' component={Admin} />
        <Route path='fryer' component={DeepFryer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
