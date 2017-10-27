import React from 'react';
import $ from 'jquery';
import Store from '../stores/store';
import types from '../actionTypes/types';
import { $http, prompt, promptShowText } from '../common/http';
import ToDoLinkAge from '../containers/connectLinkAge';
require('../styles/datepicker/bootstrap-datetimepicker');

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
      chooseCompanyData: '', // 选中公司的数据;
      downLoadButton: false, //下载按钮显示
      code: '', // 下载需要的code
      host: window.location.protocol+'//'+window.location.host+'/csc-administration/download/', // 下载域名路径
      switchData: '', // 切换菜单数据;
      tableData: '', // 当前表格数据
      setYear: '' // 当前年度;
    }
  }

  componentDidMount () {
    singleTimePicker('#setYear1', 'yyyy-mm', 3); // 日期控件;
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

  getReports () { // 获取报表数据;
    if (this.state.chooseCompanyData === '') {
      prompt('提示', '请先选择公司');
    } else {
      new Promise(resolve => {
        $.getJSON('/reportSapSource', res => {
          resolve(res)
        })
      })
      .then(res => {
        var year = $('#setYear1').val().split('-', 1),
        month = $('#setYear1').val().split('-')[1],
        companyCode = this.state.chooseCompanyData.companyCode;

        $('#kmyeTable').html("");

        $("#kmyeTable").append($(`<iframe style="width:100%;height: 100%;" src="${ res.url }/sap/bc/webdynpro/sap/zfiglwda0001?&sap-language=ZH&BUKRS=${ companyCode }&GJAHR=${ year }&MONAT=${ month }" frameborder="0" name="content_iframe" scrolling="auto" allowtransparency="true"></iframe>`));
      })
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
              <button type="submit" className="btn btn-danger m-l-lg btn-custom" data-toggle="modal" data-target="#getData1" onClick={ this.getReports.bind(this) } id="getDataBtn1">获取报表
              </button>
            </div>
            <div className="clearfix"></div>
          </div>

          <div className="m-t-md m-b-lg" id="kmyeTable" style={{ height: '630px', border: '1px solid #c3c3c3' }}>
            {/* iframe嵌入SAP网页 */}
        </div>
        </div>
      </section>
    )
  }
}

export default BalanceSheet;
