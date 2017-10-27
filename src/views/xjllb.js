import React from 'react';
import $ from 'jquery';
import Store from '../stores/store';
import types from '../actionTypes/types';
import { $http, prompt, promptShowText } from '../common/http';
import ToDoLinkAge from '../containers/connectLinkAge';
import LeftSwitch from '../components/tableGroup/leftSwitch';
import RightTable from '../components/tableGroup/rightTable';
import XjllbTableContent from '../components/tableGroup/xjllbTableContent';
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
    singleTimePicker('#setYear1', 'yyyy', 4); // 日期控件;
    this.upSetYear();
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
        type: 3
      }, (data) => {
        if (!data.list.length) {
          prompt('提示', '无数据');
          this.setState({
            downLoadButton: false
          })
        } else {
          this.setState({
            downLoadButton: true,
            switchData: data
          });

          this.getTableData(data.list[0].code)
        }
      });
    }
  }

  getTableData (code) { // 获取表格数据;
    Store.dispatch({ type: types.maskStatus, payload: true });

    $http('POST', {
      addr: 'getIncomeData',
      code: code,
      type: 3
    }, response => {
      Store.dispatch({ type: types.maskStatus, payload: false });

      this.setState({
        code: response.reportInfo.code,
        tableData: response
      });
    })
  }

  getData () { // 获取数据;
    if (this.state.chooseCompanyData === '') {
      prompt('提示', '请先选择公司');
    } else {
      $http('POST', {
        addr: 'getSapReportData',
        compCode: this.state.chooseCompanyData.companyCode,
        year: $('#setYear1').val(),
        month: $('#month1').val(),
        type: 3
      }, (data) => {
        promptShowText(data.rspDesc);
      });
    }
  }

  downLoad () { // 下载;
    Store.dispatch({ type: types.maskStatus, payload: true });

    $http('POST', {
      addr: 'downloadMasterTable',
      code: this.state.code,    //"YJ00-201605"
      type: 3
    }, (data) => {
      Store.dispatch({ type: types.maskStatus, payload: false });

      setTimeout(() => {
        window.open(encodeURI(this.state.host + data.data.url + '?constomFilename=现金流量表&deleteFileFlag=1'))
      }, 500)
    });
  }

  upSetYear () { // 监听年份;
    this.setState({
      setYear: $('#setYear1').val()
    })
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
              <button type="submit" className="btn btn-danger m-l-lg btn-custom" data-toggle="modal" data-target="#getData1" onClick={ this.upSetYear.bind(this) } id="getDataBtn1">获取数据
              </button>
            </div>
            <div className="searchblock">
              <button type="submit" className="btn btn-danger m-l-lg btn-custom" onClick={ this.search.bind(this) }>
                查询
              </button>
            </div>
            <div className="searchblock">
              <button type="submit" onClick={ this.downLoad.bind(this) } className="btn btn-danger m-l-lg btn-custom" style={{ display: this.state.downLoadButton ? 'block' : 'none' }}>下载
              </button>
            </div>

            <div className="clearfix"></div>
          </div>
          <div className="m-t-md m-b-lg" style={{ minHeight: "505px", border: "1px solid #c3c3c3" }}>
            <LeftSwitch switchData={ this.state.switchData } switchTable={ this.getTableData.bind(this) } />
            <RightTable tableData={ this.state.tableData }>
              <XjllbTableContent tableListData={ this.state.tableData } />
            </RightTable>
          </div>
        </div>

        <div id="getData1" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
          <div className="modal-dialog modal-sm">
              <div className="modal-content">
                  <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">
                          <span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                      <h4 className="modal-title">获取数据</h4>
                  </div>
                  <div className="modal-body">
                      <div>
                          公司：{ this.state.chooseCompanyData.companyName }
                      </div>
                      <div>
                          会计年度：{ this.state.setYear }
                      </div>
                      <div>
                          会计月度：
                          <select style={{ minWidth: "100px" }} id="month1">
                              <option value="1">1月</option>
                              <option value="2">2月</option>
                              <option value="3">3月</option>
                              <option value="4">4月</option>
                              <option value="5">5月</option>
                              <option value="6">6月</option>
                              <option value="7">7月</option>
                              <option value="8">8月</option>
                              <option value="9">9月</option>
                              <option value="10">10月</option>
                              <option value="11">11月</option>
                              <option value="12">12月</option>
                          </select>
                      </div>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ this.getData.bind(this) }>确定</button>
                      <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                  </div>
              </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BalanceSheet
