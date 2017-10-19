import React from 'react';
import { $http } from './http.js';

class Linkage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      soltsukolist: [{ // 租户列表;
                      'key': 0,
                      'bussLicenseNo': null,
                      'tenantCode': '',
                      'tenantId': '',
                      'tenantName': '全部'
                    }],
      initialSoltsukolist: [], // 初始租户列表;
      soltsukolistChoose: '', // 当前的租户;
      tenantId: '', // 当前租户id
      companylist: [{ // 公司列表;
                      'key': 0,
                      'companyCode': undefined,
                      'companyDesc': null,
                      'companyId': '',
                      'companyName': '全部',
                      'tenantCode': null,
                      'tenantId': '',
                      'tenantName': null
                    }],
      initialCompanylist: [], // 初始化公司列表;
      companylistChoose: '' // 当前公司;
    }
  }

  componentDidMount () {
    this.resetdroplist();
    this.resetdroplist2();
  }

  // 获取租户列表;
  resetdroplist () {
    $http('POST', {
      addr: 'getTenantListData'
    }, (data) => {
      let init = this.state.soltsukolist;
      if (data.data && data.data.length) {
        data.data.forEach(function (item, index) {
          item.key = index + 1;
          item.tenantName = item.tenantCode + ' ' + item.tenantName;
        });
      }

      this.setState({
        soltsukolist: init.concat(data.data),
        initialSoltsukolist: init.concat(data.data)
      })
    })
  }

  resetdroplist2 () { // 公司接口;
    $http('POST', {
      addr: 'getTenantCoPageData2',
      keyword: '',
      tenantId: this.state.tenantId,
      pageSize: 20000000,
      pageNumber: 1
    }, (data) => {
      let init = [{ // 公司列表;
                    'key': 0,
                    'companyCode': undefined,
                    'companyDesc': null,
                    'companyId': '',
                    'companyName': '全部',
                    'tenantCode': null,
                    'tenantId': '',
                    'tenantName': null
                 }];
      if (data.data.rows && data.data.rows.length) {
        data.data.rows.forEach(function (item, index) {
          item.key = index + 1;
          item.companyName = item.companyCode + ' ' + item.companyName;
        });
      }

      this.setState({
        companylist: init.concat(data.data.rows),
        initialCompanylist: init.concat(data.data.rows)
      })
    })
  }

  selTenant (item) { // 租户选择;
    this.setState({
      tenantId: item.tenantId,
      soltsukolistChoose: item.tenantName,
      companylistChoose: ''
    }, () => {
      this.resetdroplist2()
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

    this.state.soltsukolist.forEach((d) => {
      if (item.tenantId === d.tenantId) {
        this.setState({
          soltsukolistChoose: d.tenantName,
          companylistChoose: item.companyName
        })
        testNum++
      }
    })

    if (testNum === 0) {
      this.setState({
        soltsukolistChoose: '全部',
        companylistChoose: item.companyName
      })
    }

    if (this.props.chooseCompany) { // 向外抛出公司数据;
      this.props.chooseCompany(item);
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
      <div className="pull-left">
        <div className="searchblock">
          <span>租户：</span>
          <div style={{ marginRight: '0px', width: '200px' }} className="mydroplist btn-group">
            <button type="button" className="btn btn-danger" data-toggle="dropdown">
              {this.state.soltsukolistChoose === '' ? '全部' : this.state.soltsukolistChoose}
            </button>
            <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <input style={{width:'100%'}} onKeyUp={this.searchTenantList.bind(this)} placeholder="输入关键字查询" />
                {
                  soltsukolist.map((item) => {
                    return (
                      item.display
                      ?
                      ''
                      :
                      <li key={item.key} onClick={this.selTenant.bind(this,item)}>
                          <a key={item.key} href="#" className="data-toggle-tooltip" data-toggle="tooltip"  title={item.tenantName}>{item.tenantName}</a>
                      </li>
                    )
                  })
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
            <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="caret"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <input style={{width:'100%'}} onKeyUp={this.searchCompanyList.bind(this)} placeholder="输入关键字查询" />
              {
                  companylist.map((item) => {
                    return (
                      item.display
                      ?
                      ''
                      :
                      <li key={item.key} onClick={this.selCompany.bind(this, item)}>
                          <a key={item.key} href="#" className="data-toggle-tooltip" data-toggle="tooltip"  title={item.companyName}>{item.companyName}</a>
                      </li>
                    )
                  })
                }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Linkage;
