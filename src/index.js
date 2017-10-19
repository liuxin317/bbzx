import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'babel-polyfill';
import store from './stores/store.js';

store.dispatch({ type: 'TOKEN', payload: '033dac425572d4984daaf1059099b679' }) //action请求
// console.log(store.getState());

// Render the main component into the dom
const render = () => ReactDOM.render(
  <App />
  , document.getElementById('app')
);

render()
store.subscribe(render) // 监听store状态;
