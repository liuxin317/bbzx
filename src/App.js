require('styles/bootstrap/css/bootstrap.min.css');
// require('styles/font-awesome.min.css');
require('styles/bootstrap-table/bootstrap-table.css');
require('styles/datepicker/bootstrap-datetimepicker.css');
require('styles/All.css');
require('styles/views.css');
require('styles/report.css');
// require('styles/jquery.min.js');

import React, { Component } from 'react';
// import Main from 'components/Main.js';
import Linkage from './common/linkage.js';
// import $ from 'jquery';
// console.log($('body').height())
class App extends Component {
  render() {
    return (
      <div>
        <Linkage />
      </div>
    )
  }
}

export default App
