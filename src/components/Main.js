require('normalize.css/normalize.css');
require('styles/All.css');
require('styles/App.css');
require('styles/bootstrap/css/bootstrap.min.css');

import React from 'react';
import $http from '../common/http.js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  componentDidMount () {
    $http('POST', {
      addr: 'getSystemList'
    }, () => {

    })
  }

  render() {
    return (
      <Router>
        <div className="index">
          <img src={yeomanImage} alt="Yeoman Generator" />
          <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
          <div className="container">
          <Link to="/a"><button>123</button></Link>
          <Link to="/b"><button>789</button></Link>
          </div>

          <Route exact path="/" component={A} />
          <Route path="/a" component={A} />
          <Route path="/b" component={B} />
        </div>
      </Router>
    );
  }
}

class A extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <p className="a">url: {this.props.match.url}</p>
    )
  }
}

class B extends React.Component {
  render () {
    return (
      <p className="b">url: {this.props.match.url}</p>
    )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
