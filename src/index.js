import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'babel-polyfill';
import { Provider } from 'react-redux'
import Store from './stores/store.js';

//action请求
Store.dispatch({ type: 'TOKEN', payload: '033dac425572d4984daaf1059099b679' })
// setTimeout( () => {  }, 1000);
// console.log(Store.getState());

// Render the main component into the dom
const render = () => ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>
  , document.getElementById('app')
);

render()
Store.subscribe(render) // 监听store状态;
