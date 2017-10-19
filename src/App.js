require('styles/bootstrap/css/bootstrap.min.css');
require('styles/bootstrap-table/bootstrap-table.css');
require('styles/datepicker/bootstrap-datetimepicker.css');
require('styles/All.css');
require('styles/views.css');
require('styles/report.css');

import React, { Component } from 'react';
import BalanceSheet from './components/zcfzb.js';

class App extends Component {
  render() {
    return (
      <div>
        <BalanceSheet />
      </div>
    )
  }
}

export default App
