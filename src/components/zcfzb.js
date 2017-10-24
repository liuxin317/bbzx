import React from 'react';
import $ from 'jquery';
import { $http, prompt } from '../common/http.js';
import ToDoLinkAge from '../containers/connect.js';
import Store from '../stores/store.js';
require('../styles/datepicker/bootstrap-datetimepicker.js');

//单个日期控件 控件id，日期格式，起始模式年/月/日
function singleTimePicker(id, format, startView) {
  $(id).datetimepicker({
    language: 'zh-CN',
    format: format,
    weekStart: 0,
    todayBtn: false,
    autoclose: true,
    todayHighlight: 1,
    startView: startView,
    minView: 4,
    forceParse: false
  });
  $(id).datetimepicker('update', (new Date()));
}

class BalanceSheet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      chooseCompanyData: '' // 选中公司的数据;
    }
  }

  componentDidMount () {
    singleTimePicker('#setYear1', 'yyyy', 4); // 日期控件;
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

  search () { // 查询数据;
    if (this.state.chooseCompanyData === '') {
      prompt('提示', '请先选择公司');
    } else {
      $http('POST', {
        addr: 'getMasTabRptList',
        compCode: this.state.chooseCompanyData.companyCode,
        year: $('#setYear1').val(),
        type: 1
      }, (data) => {

      });
    }
  }

  render () {
    return (
      <section>
        <div className="tab-pane" id="zcfz">
          <div className="v-middle">
            <ToDoLinkAge chooseCompany={ this.getChooseCompany.bind(this) } clearData={ this.clearData.bind(this) } />

            <div className="searchblock">
              <span className="pull-left" style={{ lineHeight: '34px', backgroundColor: '#f3f3f3'}}>会计年度：</span>

              <div id="dp1" className="pull-left input-append date form_datetime w150">
                <input id="setYear1" className="form-control" type="text" readOnly />
                <span
                  style={{ pointerEvents: 'none', position: 'absolute', right: '0px', top: '0px' }}
                  className="dateicon">
                </span>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="searchblock">
              <button type="submit" className="btn btn-danger m-l-lg btn-custom" data-toggle="modal" data-target="#getData1" id="getDataBtn1">获取数据
              </button>
            </div>
            <div className="searchblock">
              <button type="submit" className="btn btn-danger m-l-lg btn-custom" onClick={ this.search.bind(this) }>
                查询
              </button>
            </div>
            <div className="searchblock">
              <button type="submit" className="btn btn-danger m-l-lg btn-custom">下载
              </button>
            </div>

            <div className="clearfix"></div>
          </div>
        </div>
      </section>
    )
  }
}

export default BalanceSheet
