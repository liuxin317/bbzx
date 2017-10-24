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
import Load from './common/loading';
import Zcfzb from './views/Zcfzb';
import Kmyeb from './views/Kmyeb';



const history = createHistory();

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <ConnectedRouter history={history}>
        <div>
          <Load state={false} />
          <Route exact path="/zcfzb" component={Zcfzb}></Route>
          <Route path="/kmyeb" component={Kmyeb}></Route>
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
