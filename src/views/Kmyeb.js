import React, { Component } from 'react';
import ToDoLinkAge from '../containers/connectLinkAge.js';

export default class Kmyeb extends Component {
  constructor (props) {
    super(props);
    this.state = {
      chooseCompanyData: '' // 选中公司的数据;
    }
  }

  getChooseCompany (data) { // 获取选中公司数据;
    this.setState({
      chooseCompanyData: data
    })
  }

  clearData () { // 清空数据;
    this.setState({
      chooseCompanyData: ''
    })
  }

  render () {
    return (
      <div>
        <ToDoLinkAge 
          chooseCompany={ this.getChooseCompany.bind(this) } 
          clearData={ this.clearData.bind(this) } 
        />
      </div>
    )
  }
}
