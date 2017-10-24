import { $http } from '../common/http.js';

let fetchPosts = (params, type) => dispatch => {
  $http('POST', params , (data) => {
    dispatch({
      'type': type,
      'payload': data
    })
  });
}

export default fetchPosts;
