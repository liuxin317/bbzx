require('styles/bootstrap/css/bootstrap.min.css');
require('styles/bootstrap-table/bootstrap-table.css');
require('styles/datepicker/bootstrap-datetimepicker.css');
require('styles/All.css');
require('styles/views.css');
require('styles/report.css');

import React, { Component } from 'react';
// 路由相关
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, push } from 'react-router-redux';

// 组件相关
import BalanceSheet from './components/zcfzb.js';
import Load from './components/loading.js';

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
          <Route exact path="/" component={BalanceSheet}></Route>
          <Route path="/Page"></Route>
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
