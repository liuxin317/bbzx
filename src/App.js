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
import Load from './common/Loading';
import Zcfzb from './views/Zcfzb';
import Lrb from './views/Lrb';
import Xjllb from './views/Xjllb';
import Kmyeb from './views/Kmyeb';
import Xmmxb from './views/Xmmxb';
import Pzzx from './views/Pzzx';
import Zzmxb from './views/Zzmxb'; // 总账明细表

const history = createHistory();

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Load state={this.props.store.rootReducers} />
          <Route exact path="/" component={Pzzx} />
          <Route path="/zcfzb" component={Zcfzb} />
          <Route path="/lrb" component={Lrb} />
          <Route path="/xjllb" component={Xjllb} />
          <Route path="/kmyeb" component={Kmyeb} />
          <Route path="/xmmxb" component={Xmmxb} />
          <Route path="/zzmxb" component={Zzmxb} />
          <Route path="/pzzx" component={Pzzx} />
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
