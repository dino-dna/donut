import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { configure as configureStore, get as getStore } from './state/store';
import './index.css';


configureStore();

ReactDOM.render(
  <Provider store={getStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
