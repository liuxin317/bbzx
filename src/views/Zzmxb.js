import React, { Component } from 'react';
import ToDoLinkAge from '../containers/connectLinkAge';
import { DoubleTimePicker, SingleTimePicker } from '../components/DatePicker';

import { $http, prompt } from '../common/http.js';

import Modal from './../components/ModalZzmxb';

export default class Kmyeb extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // 选中公司的数据;
      chooseCompanyData: '',
      type: 'S',
      pageSize: 2,
      pageNumber: 1,
      subjectList: [], // 科目代码列表
      startTime: '',
      endTime: '',
      iframeHost: ''
    }
  }

  // 获取选中公司数据;
  getChooseCompany = data => {
    console.log(data)
    this.setState({
      chooseCompanyData: data
    })
  }

  // 清空数据;
  clearData = () => { 
    this.setState({
      chooseCompanyData: ''
    })
  }

  // 选择类型
  handlesSelectType = (e) => {
    this.setState({ type: e.target.value });
  }

  // 搜索按钮
  handleSearch = () => {
    let startTime = document.getElementById('startTime').value.replace(/-/g, '');
    let endTime = document.getElementById('endTime').value.replace(/-/g, '');
    let type = this.state.type;

    this.setState({ startTime, endTime }, () => {
      if (this.state.chooseCompanyData) {
        $http('POST', {
          addr: 'getSubjectList',
          compId: this.state.chooseCompanyData.companyId,
          tenantId: this.state.chooseCompanyData.tenantId,
          type: this.state.type,
          pageSize: this.state.pageSize,
          pageNumber: this.state.pageNumber
        }, (data) => {
          this.setState({subjectList: data.data.rows});
        });

        $('#getData4').modal('show');
      } else {
        prompt("提示", "请选择公司")
      }
    });
  }

  // 获取弹窗数据
  getModalData = params => {
    let iframeSrc = '';
    
    if (params.selectedStr) {
      iframeSrc = `${this.state.iframeHost}/sap/bc/webdynpro/sap/zfiglwda0002?TYPE=${this.state.type}${params.selectedStr}&BUKRS=${this.state.chooseCompanyData.companyCode}&HKONT=${params.subjectCodeStr}DATE=${this.state.startTime}${this.state.endTime}&sap-language=ZH`
    }
    
    this.setState({ iframeSrc });
  }

  componentDidMount () {
    // 获取初始时间区间
    let startTime = document.getElementById('startTime').value.replace(/-/g, '');
    let endTime = document.getElementById('endTime').value.replace(/-/g, '');

    // 获取链接
    $http.get('/reportSapSource').then(res => {
      this.setState({iframeHost: res.url});
    })

    this.setState({startTime, endTime});
  }

  render () {
    return (
      <div className="page">
        <div className="search-bar">
          <div className="search-bar-item">
            <ToDoLinkAge 
              chooseCompany={ this.getChooseCompany } 
              clearData={ this.clearData } 
            />
          </div>
          <div className="search-bar-item">
            <span className="search-bar-item__label">查询类别：</span>
            <select className="search-bar-item__select"
              onChange={this.handlesSelectType}
              value={this.state.type}
            >
              <option name="1" value="S">一般总账</option>
              <option name="2" value="K">客户</option>
              <option name="3" value="L">供应商</option>
            </select>
          </div>
          <div className="search-bar-item">
            <span className="search-bar-item__label pull-left">查询期间：</span>
            <span className="search-bar-item__datepicker pull-left">
              <DoubleTimePicker />
            </span>
          </div>
          <div className="search-bar-item">
            <button type="submit" className="pull-left btn m-l-lg btn-custom search-bar-item__button"
              onClick={this.handleSearch}
            >
              会计科目
            </button>
          </div>
        </div>
        <div className="page-body">
          {
            this.state.iframeSrc
            ? (
                <iframe style={{width:'100%', height: '630px'}}
                  frameBorder="0" 
                  name="content_iframe"
                  scrolling="auto" 
                  allowTransparency="true"
                  src={this.state.iframeSrc}
                >
                </iframe>
              )
            : ''
          }
        </div>

        <Modal subjectList={this.state.subjectList} 
          onModalData={this.getModalData}
        />
      </div>
    )
  }
}
