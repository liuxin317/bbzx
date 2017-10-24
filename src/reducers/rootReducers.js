// 通过combineReducers将多个reducer合并成一个rootReducer。
// import { combineReducers } from 'redux';
// import todos from '../todos/test.js';
// import testB from '../todos/testB.js';

// const rootReducers = combineReducers({
//   a: todos,
//   b: testB
// });

// export default rootReducers;

import types from '../actionTypes/types.js';

export default (state = {}, action) => {
  switch (action.type) {
    case 'TOKEN':
      var obj = { TOKEN: action.payload }
      return Object.assign({},state, obj);
    case types.tenantData:
      var obj = { resetdroplist: action.payload }
      return Object.assign({}, state, obj);
    case types.companyList:
      var obj = { companyList: action.payload }
      return Object.assign({}, state, obj);
    case types.maskStatus:
      var obj = { maskStatus: action.payload }
      return Object.assign({}, state, obj);
    default:
      return state
  }
}
