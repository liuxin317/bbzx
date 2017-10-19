import axios from 'axios';

var TOKEN = 'cc99f222667b32e14a237ef7062ebeeb';

const $http = (method, data = {}, callback = null, error = null) => {
  data.token = TOKEN;
  axios({
    method: method,
    url: '/csc-administration/ServiceServlet',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    responseType: 'json',
    params: data
  })
  .then(function (response) {
    callback(response)
  })
  .catch(function () {
    error && error()
  });
};

export default $http;
