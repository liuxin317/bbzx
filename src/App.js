require('styles/bootstrap/css/bootstrap.min.css');
require('styles/bootstrap-table/bootstrap-table.css');
require('styles/datepicker/bootstrap-datetimepicker.css');
require('styles/All.css');
require('styles/views.css');
require('styles/report.css');

import React, { Component } from 'react';
import BalanceSheet from './components/zcfzb.js';
import Load from './components/loading.js';

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Load state={false} />
        <BalanceSheet />
      </div>
    )
  }
}

export default App
