import React from 'react';
import $ from 'jquery';
import { $http } from '../common/http.js';
import Store from '../stores/store.js';
import types from '../actionTypes/types.js';
import { Tooltip } from 'antd';

class Linkage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      soltsukolist: [],
      initialSoltsukolist: [], // 初始租户列表;
      soltsukolistChoose: '', // 当前的租户;
      tenantId: '', // 当前租户id
      companylist: [],
      initialCompanylist: [], // 初始化公司列表;
      companylistChoose: '' // 当前公司;
    }
  }

  componentDidMount () {
    this.props.getResetdroplist({addr: 'getTenantListData'});
    this.props.getCompanylist({
      addr: 'getTenantCoPageData2',
      keyword: '',
      tenantId: this.state.tenantId,
      pageSize: 20000000,
      pageNumber: 1
    })
  }

  componentWillReceiveProps () {
    let tenant = this.props.tenant();
    let company = this.props.company();

    this.setState({
      initialSoltsukolist: tenant,
      initialCompanylist: company,
      soltsukolist: tenant,
      companylist: company
    })
  }

  selTenant (item) { // 租户选择;
    this.props.clearData(); // 清空公司数据;

    this.setState({
      tenantId: item.tenantId,
      soltsukolistChoose: item.tenantName,
      companylistChoose: ''
    }, () => {
      Store.dispatch({ type: types.maskStatus, payload: true });

      this.props.getCompanylist({
        addr: 'getTenantCoPageData2',
        keyword: '',
        tenantId: item.tenantId,
        pageSize: 20000000,
        pageNumber: 1
      })
    })
  }

  searchTenantList (event) { // 搜索租户列表;
    let value = event.target.value;
    let temporaryData = JSON.parse(JSON.stringify(this.state.initialSoltsukolist));
    if (value) {
      for (var i = 0; i < temporaryData.length; i++) {
        var item = temporaryData[i];

        if (item.tenantName.indexOf(value.toLocaleLowerCase()) > -1 || item.tenantName.indexOf(value.toLocaleUpperCase()) > -1) {

        } else {
          item.display = true;
        }
      }
    }

    this.setState({
      soltsukolist: temporaryData
    })
  }

  selCompany (item) { // 公司选择;
    var testNum = 0;

    if (this.state.soltsukolist) {
      this.state.soltsukolist.forEach((d) => {
        if (item.tenantId === d.tenantId) {
          this.setState({
            soltsukolistChoose: d.tenantName,
            companylistChoose: item.companyName
          })
          testNum++
        }
      })
    }

    if (testNum === 0) {
      this.setState({
        soltsukolistChoose: '全部',
        companylistChoose: item.companyName
      })
    }

    if (this.props.chooseCompany) { // 向外抛出公司数据;
      if (item.companyName === '全部') {
        this.props.chooseCompany('');
      } else {
        this.props.chooseCompany(item);
      }

    }
  }

  searchCompanyList (event) { // 搜索公司列表;
    let value = event.target.value;
    let temporaryData = JSON.parse(JSON.stringify(this.state.initialCompanylist));
    if (value) {
      for (var i = 0; i < temporaryData.length; i++) {
        var item = temporaryData[i];

        if (item.companyName.indexOf(value.toLocaleLowerCase()) > -1 || item.companyName.indexOf(value.toLocaleUpperCase()) > -1) {

        } else {
          item.display = true;
        }
      }
    }

    this.setState({
      companylist: temporaryData
    })
  }

  render () {
    var soltsukolist = this.state.soltsukolist;
    var companylist = this.state.companylist;

    return (
      <div className={"pull-left " + this.props.style}>
        <div className="searchblock">
          <span>租户：</span>
          <div style={{ marginRight: '0px', width: '200px' }} className="mydroplist btn-group">
            <button type="button" className="btn btn-danger" data-toggle="dropdown">
              {this.state.soltsukolistChoose === '' ? '全部' : this.state.soltsukolistChoose}
            </button>
            <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: '#f3f3f3' }}>
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <input style={{width:'100%'}} onKeyUp={this.searchTenantList.bind(this)} placeholder="输入关键字查询" />
                {
                  soltsukolist ? soltsukolist.map((item) => {
                    return (
                      item.display
                      ?
                      ''
                      :
                      <Tooltip key={item.key} title={ item.tenantName }>
                      <li onClick={this.selTenant.bind(this,item)}>
                          <a href="javascript: ">
                              {item.tenantName}
                          </a>
                      </li>
                      </Tooltip>
                    )
                  })
                  : ''
                }
            </ul>
          </div>
        </div>

        <div className="searchblock">
          <span>公司：</span>
          <div style={{marginRight: '0px', width: '200px'}} className="mydroplist btn-group">
            <button type="button" className="btn btn-danger" data-toggle="dropdown">
              {this.state.companylistChoose === '' ? '全部' : this.state.companylistChoose}
            </button>
            <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  style={{ backgroundColor: '#f3f3f3' }}>
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <input style={{width:'100%'}} onKeyUp={this.searchCompanyList.bind(this)} placeholder="输入关键字查询" />
              {
                  companylist ? companylist.map((item) => {
                    return (
                      item.display
                      ?
                      ''
                      :
                      <Tooltip key={item.key} title={ item.companyName }>
                      <li onClick={this.selCompany.bind(this, item)}>
                          <a href="javascript: ">
                            {item.companyName}
                          </a>
                      </li>
                      </Tooltip>
                    )
                  })
                  : ''
                }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Linkage;
