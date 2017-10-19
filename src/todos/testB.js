export default (state = 0, action) => {
  // switch (action.type) {
  //   case 'INCREMENT':
  //     var obj = { a: ++action.payload }
  //     return Object.assign({},state, obj);
  //   case 'DECREMENT':
  //     var obj = { b: 2 }
  //     return Object.assign({},state, obj);
  //   default:
  //     return state
  // }
  switch (action.type) {
    case 'DECREMENT':
      return 2;
    default:
      return state
  }
}
