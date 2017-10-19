// 通过combineReducers将多个reducer合并成一个rootReducer。
// import { combineReducers } from 'redux';
// import todos from '../todos/test.js';
// import testB from '../todos/testB.js';

// const rootReducers = combineReducers({
//   a: todos,
//   b: testB
// });

// export default rootReducers;

export default (state = {}, action) => {
  switch (action.type) {
    case 'TOKEN':
      var obj = { TOKEN: action.payload }
      return Object.assign({},state, obj);
    default:
      return state
  }
}
