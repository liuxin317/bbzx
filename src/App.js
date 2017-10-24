require('styles/bootstrap/css/bootstrap.min.css');
require('styles/bootstrap-table/bootstrap-table.css');
require('styles/datepicker/bootstrap-datetimepicker.css');
require('styles/All.css');
require('styles/views.css');
require('styles/report.css');

import React, { Component } from 'react';
// 组件相关
import Zcfzb from './views/zcfzb.js';
import Load from './common/loading.js';

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Load state={this.props.store.maskStatus} />
        <Zcfzb />
      </div>
    )
  }
}

export default App
