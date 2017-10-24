//store里面就是一堆数据嘛，那么数据怎么来，通过reducer组合而来，所以createStore的时候，就要把初始化的数据传进来：rootReducer
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/rootReducers.js';

// 路由相关
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const history = createHistory();
const router = routerMiddleware(history);

const store = createStore(combineReducers({
  routerReducer,
  rootReducers
}), applyMiddleware(thunk, router));

export default store;
