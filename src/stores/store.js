//store里面就是一堆数据嘛，那么数据怎么来，通过reducer组合而来，所以createStore的时候，就要把初始化的数据传进来：rootReducer
import { createStore } from 'redux';
import rootReducers from '../reducers/rootReducers.js';

const store = createStore(rootReducers);

export default store;
