import React from 'react';
import $ from 'jquery';
import Store from '../stores/store';
import types from '../actionTypes/types';
import { $http, prompt, promptShowText, getToken } from '../common/http';
import ToDoLinkAge from '../containers/connectLinkAge';
import { DoubleTimePicker } from '../components/DatePicker';
require('../styles/bootstrap/js/bootstrap.min');
require('../styles/table-group');

class BalanceSheet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      chooseCompanyData: '', // 选中公司的数据;
      host: window.location.protocol+'//'+window.location.host+'/csc-administration/download/', // 下载域名路径
      xmData: '', // 项目数据
      xmCode: [], // 选择的项目名称code
      cbData: '', // 成本数据
      cbCode: [] // 选择的成本code
    }
  }

  componentDidMount () {
    setTimeout(() => {
      $('.no-hide').on('click', function (e) {
        e.stopPropagation();
      })
    }, 1000)
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

  getReports () { // 获取报表;
    if (this.state.chooseCompanyData === '') {
      prompt('提示', '请先选择公司');
    } else {
      new Promise(resolve => {
        $.getJSON('/reportSapSource', res => {
          resolve(res)
        })
      })
      .then(res => {
        let start = $('#startTime').val().trim();
        let end = $('#endTime').val().trim();
        let companyCode = this.state.chooseCompanyData.companyCode;
        let xmCode = '';
        if (this.state.xmCode.length) {
          this.state.xmCode.forEach((item) => {
            xmCode += item.code + ';'
          })
        }
        let cbCode = '';
        if (this.state.cbCode.length) {
          this.state.cbCode.forEach((item) => {
            cbCode += item.code + ';'
          })
        }

        $('#xmmxTable').html("");

        $("#xmmxTable").append($(`<iframe style="width:100%;height: 100%;" src=${ res.url }/sap/bc/webdynpro/sap/zfiglwdc0003?BUKRS=${ companyCode }&POSID=${ xmCode }&KOSTL=${ cbCode }&DATE=${ start }${ end }&sap-language=ZH "frameborder="0" name="content_iframe" scrolling="auto" allowtransparency="true"></iframe>`));
      })
    }
  }

  //项目名称-项目明细
  mcTable () {
    //先销毁表格
    if (!this.state.xmData) {
      if (this.state.chooseCompanyData === '') {
        prompt('提示', '请先选择公司');
      } else {
        var self = this;

        $('#mc').bootstrapTable('destroy');
        $('#mc').bootstrapTable(
          {
            url: "/csc-administration/ServiceServlet", //$.getSingleObject().ajaxurls.getCompanyList,//数据源
            // dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
            pagination: true,//是否分页
            clickToSelect: true,
            maintainSelected: true,
            pageSize: 2,//单页记录数
            pageNumber: 1,
            pageList: [5, 10, 20, 50],//分页步进值
            sidePagination: "server",//服务端分页
            contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
            dataType: "json",//期待返回数据类型
            method: "post",//请求方式
            //searchAlign: "left",//查询框对齐方式
            queryParamsType: "limit",//查询参数组织方式
            responseHandler: function (res) {
              let xmCode = self.state.xmCode;

              self.setState({
                xmData: res.data
              })

              xmCode.forEach((d) => {
                res.data.rows.forEach((item) => {
                  if (d.id === item.id) {
                    item.state = true
                  }
                })
              })

              return res.data
            },
            queryParams: function getParams(params) {
                var query = {};
                //params obj
                query.companyId = self.state.chooseCompanyData.companyId;
                query.addr = 'getWbsProjectList';
                query.token = getToken;
                query.date = (new Date().toGMTString());

                //query.selectItemName = ;
                query.compId = self.state.chooseCompanyData.companyId;
                query.tenantId = self.state.chooseCompanyData.tenantId;
                query.pageSize = params.limit;
                query.pageNumber = Math.ceil(params.offset / params.limit) + 1;
                return query;
            },
            searchOnEnterKey: true,//回车搜索
            columns: [
                {
                    field: 'state',
                    width: 10,//宽度
                    checkbox: true,
                    align: "center",//水平
                    valign: "middle"//垂直
                },
                {
                    field: 'Number',
                    title: '序号',
                    width: 15,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        //return index + 1;
                        var page = $('#mc').bootstrapTable("getPage");
                        return page.pageSize * (page.pageNumber - 1) + index + 1;
                    }
                },
                {
                    title: "代码",//标题
                    field: "code",//键名
                    width: 50,//宽度
                    order: "desc",//默认排序方式
                    valign: "middle"//垂直
                },
                {
                    title: "名称",//标题
                    field: "name",//键名
                    width: 50,//宽度
                    order: "desc",//默认排序方式
                    valign: "middle"//垂直
                }
            ],
            onCheck: function (row) {
              var xmCode = self.state.xmCode;
              xmCode.push(row)

              self.setState({
                xmCode: xmCode
              })
            },
            onUncheck: function (row) {
              var xmCode = self.state.xmCode;

              xmCode.forEach((item, index) => {
                if (item.id == row.id) {
                  xmCode.splice(index, 1)
                }
              })

              self.setState({
                xmCode: xmCode
              })
            },
            onCheckAll: function (row) {
              self.setState({
                xmCode: row
              })
            },
            onUncheckAll: function (row) {
              self.setState({
                xmCode: []
              })
            },
            locale: "zh-CN",//中文支持,
            //detailView: false //是否显示详情折叠
          }
        );
      }
    }
  }

  // 成本中心;
  cbTable () {
    //先销毁表格
    if (!this.state.cbData) {
      if (this.state.chooseCompanyData === '') {
        prompt('提示', '请先选择公司');
      } else {
        var self = this;

        $('#cb').bootstrapTable('destroy');
        $('#cb').bootstrapTable(
          {
            url: "/csc-administration/ServiceServlet", //$.getSingleObject().ajaxurls.getCompanyList,//数据源
            // dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
            pagination: true,//是否分页
            clickToSelect: true,
            maintainSelected: true,
            pageSize: 2,//单页记录数
            pageNumber: 1,
            pageList: [5, 10, 20, 50],//分页步进值
            sidePagination: "server",//服务端分页
            contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
            dataType: "json",//期待返回数据类型
            method: "post",//请求方式
            //searchAlign: "left",//查询框对齐方式
            queryParamsType: "limit",//查询参数组织方式
            responseHandler: function (res) {
              let cbCode = self.state.cbCode;

              self.setState({
                cbData: res.data
              })

              cbCode.forEach((d) => {
                res.data.rows.forEach((item) => {
                  if (d.id === item.id) {
                    item.state = true
                  }
                })
              })

              return res.data
            },
            queryParams: function getParams(params) {
                var query = {};
                //params obj
                query.companyId = self.state.chooseCompanyData.companyId;
                query.addr = 'getCostCenterList';
                query.token = getToken;
                query.date = (new Date().toGMTString());

                //query.selectItemName = ;
                query.compId = self.state.chooseCompanyData.companyId;
                query.tenantId = self.state.chooseCompanyData.tenantId;
                query.pageSize = params.limit;
                query.pageNumber = Math.ceil(params.offset / params.limit) + 1;
                return query;
            },
            searchOnEnterKey: true,//回车搜索
            columns: [
                {
                    field: 'state',
                    width: 10,//宽度
                    checkbox: true,
                    align: "center",//水平
                    valign: "middle"//垂直
                },
                {
                    field: 'Number',
                    title: '序号',
                    width: 15,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        //return index + 1;
                        var page = $('#cb').bootstrapTable("getPage");
                        return page.pageSize * (page.pageNumber - 1) + index + 1;
                    }
                },
                {
                    title: "代码",//标题
                    field: "code",//键名
                    width: 50,//宽度
                    order: "desc",//默认排序方式
                    valign: "middle"//垂直
                },
                {
                    title: "名称",//标题
                    field: "name",//键名
                    width: 50,//宽度
                    order: "desc",//默认排序方式
                    valign: "middle"//垂直
                }
            ],
            onCheck: function (row) {
              var cbCode = self.state.cbCode;
              cbCode.push(row)

              self.setState({
                cbCode: cbCode
              })
            },
            onUncheck: function (row) {
              var cbCode = self.state.cbCode;

              cbCode.forEach((item, index) => {
                if (item.id == row.id) {
                  cbCode.splice(index, 1)
                }
              })

              self.setState({
                cbCode: cbCode
              })
            },
            onCheckAll: function (row) {
              self.setState({
                cbCode: row
              })
            },
            onUncheckAll: function (row) {
              self.setState({
                cbCode: []
              })
            },
            locale: "zh-CN",//中文支持,
            //detailView: false //是否显示详情折叠
          }
        );
      }
    }
  }

  render () {
    const options = {
      expandBy: 'column'  // Currently, available value is row and column, default is row
    };
    var xmName = '';
    var cbName = '';

    if (this.state.xmCode.length) {
      this.state.xmCode.forEach((item) => {
        xmName += item.name + ','
      })

      xmName = xmName.substr(0, xmName.length - 1)
    }

    if (this.state.cbCode.length) {
      this.state.cbCode.forEach((item) => {
        cbName += item.name + ','
      })

      cbName = cbName.substr(0, cbName.length - 1)
    }

    return (
      <section>
        <div className="tab-pane" id="zcfz">
          <div className="v-middle" id="xmmx">
            <ToDoLinkAge style="link-age-style" chooseCompany={ this.getChooseCompany.bind(this) } clearData={ this.clearData.bind(this) } />
            <div className="searchblock">
              <span className="pull-left v-middle">
                <span className="pull-left" style={{ lineHeight: '34px' }}>项目名称：</span>
                {/* <!--table模拟下拉框--> */}
                <input type="text" id="mcCompany" style={{ width: '110px', height: '33px', marginTop: '5px \9' }} value={ xmName } className="pull-left btn no-radius bg-white p-xs inputList2" data-toggle="dropdown" onClick={ this.mcTable.bind(this) } readOnly/>
                <button type="button" className="pull-left btn dropdown-toggle cube-xs p-n no-radius" data-toggle="dropdown" style={{ width: '27px', height: '33px', backgroundColor: 'rgb(221, 221, 221)', marginTop: '5px \9' }} aria-haspopup="true" aria-expanded="false"  onClick={ this.mcTable.bind(this) }>
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu no-hide" style={{ width: '532px', top: '55px', left: '503px' }} id="mc_box">
                    {/* <button>确定</button> */}
                    <table data-response-handler="tableResponseHandlerChecksName" id="mc"
                           className="table table-hover"></table>
                </ul>
              </span>
            </div>

            <div className="searchblock">
              <span className="pull-left v-middle">
                <span className="pull-left" style={{ lineHeight: '34px' }}>成本中心：</span>
                {/* <!--table模拟下拉框--> */}
                <input type="text" id="cbCompany" style={{ width: '110px', height: '33px', marginTop: '5px \9' }} className="pull-left btn no-radius bg-white p-xs inputList2" value={ cbName } onClick={ this.cbTable.bind(this) } data-toggle="dropdown" readOnly/>
                <button type="button" className="pull-left btn dropdown-toggle cube-xs p-n no-radius" data-toggle="dropdown" style={{ width: '27px', height: '33px', backgroundColor: 'rgb(221, 221, 221)', marginTop: '5px \9' }} aria-haspopup="true" aria-expanded="false" onClick={ this.cbTable.bind(this) }>
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu no-hide" style={{ width: '532px', top: '55px', left: '721px' }} id="cb_box">
                    <table data-response-handler="tableResponseHandlerChecksName" id="cb"
                           className="table table-hover"></table>
                </ul>
              </span>
            </div>

            <div className="searchblock">
              <span className="pull-left" style={{ lineHeight: '34px', backgroundColor: '#f3f3f3'}}>查询期间：</span>

              <DoubleTimePicker />
              <div className="clearfix"></div>
            </div>
            <div className="searchblock">
              <button type="submit" className="btn btn-danger m-l-lg btn-custom" data-toggle="modal" data-target="#getData1" onClick={ this.getReports.bind(this) } id="getDataBtn1">获取报表
              </button>
            </div>
            <div className="clearfix"></div>
          </div>

          <div className="m-t-md m-b-lg" id="xmmxTable" style={{ height: '630px', border: '1px solid #c3c3c3' }}>
            {/* iframe嵌入SAP网页 */}
        </div>
        </div>
      </section>
    )
  }
}

export default BalanceSheet;
