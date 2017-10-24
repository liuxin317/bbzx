import { $http } from '../common/http.js';
import types from '../actionTypes/types.js';

let fetchPosts = (params, type) => dispatch => {
  $http('POST', params , (data) => {
    dispatch({
      'type': type,
      'payload': data
    })
    if (type === types.companyList) {
      dispatch({
        'type': types.maskStatus,
        'payload': false
      })
    }
  });
}

export default fetchPosts;
