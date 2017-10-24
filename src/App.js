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

// 路由相关
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, push } from 'react-router-redux';


const history = creacteHistory();

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <ConnectedRouter>
        <div>
          <Load state={false} />
          <Route exact path="/" component={Zcfzb}></Route>
          <Route path="/Page"></Route>
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
