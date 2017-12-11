import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './stores/store.js';
import types from './actionTypes/types.js';

//action请求
Store.dispatch({ type: types.maskStatus, payload: true })

// Render the main component into the dom
const render = () => ReactDOM.render(
  <Provider store={Store}>
    <App store={Store.getState()} />
  </Provider>
  , document.getElementById('app')
);

render()
Store.subscribe(render) // 监听store状态;
