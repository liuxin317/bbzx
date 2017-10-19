import React from 'react';
import store from '../stores/store.js';
// import $http from '../common/http.js';

console.log(store.getState());

class Linkage extends React.Component {
  render () {
    return (
      <div className="tab-pane" id="zcfz">
        <div className="v-middle">
          <div className="searchblock">
            <span>租户：</span>
            <div style={{ marginRight: '0px', width: '200px' }} className="mydroplist btn-group">
              <button type="button" className="btn btn-danger" data-toggle="dropdown">
                全部
              </button>
              <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <input style={{width:'100%'}} placeholder="输入关键字查询" />
                <li>
                    <a href="#" className="data-toggle-tooltip">item.tenantName</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="searchblock">
            <span>公司：</span>
            <div style={{marginRight: '0px', width: '200px'}} className="mydroplist btn-group">
              <button type="button" className="btn btn-danger" data-toggle="dropdown">
                全部
              </button>
              <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <input style={{width:'100%'}} placeholder="输入关键字查询" />
              </ul>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default Linkage;
