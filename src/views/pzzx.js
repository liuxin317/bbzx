import React from 'react';
import $ from 'jquery';
import Store from '../stores/store';
import types from '../actionTypes/types';
import { $http, prompt, promptShowText, getToken } from '../common/http';
import ToDoLinkAge from '../containers/connectLinkAge';
import { DoubleTimePicker } from '../components/DatePicker';
require('../styles/table-group');

class BalanceSheet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      chooseCompanyData: '', // 选中公司的数据;
      host: window.location.protocol+'//'+window.location.host+'/csc-administration/download/', // 下载域名路径
      dataType: 0, //查询类型;
      dataTypeName: '记账日期' //类型名称;
    }
  }

  componentDidMount () {
    if(!('placeholder' in document.createElement('input'))){ // 判断浏览器是否兼容placeholder;
      setTimeout(() => {
        $('.placeholder').each(function(){
          this.value = $(this).attr('placeholder');
          $(this).focus(function () {
            if($(this).val().trim() == $(this).attr('placeholder')){
                this.value = '';
            }
          });

          $(this).blur(function(){
            if($(this).val() == ""){
              this.value = $(this).attr('placeholder');
            }
          });
        });
      }, 1000);
    };
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
      //先销毁表格
      var self = this;

      $('#kjpzRpt').bootstrapTable('destroy');
      $('#kjpzRpt').bootstrapTable(
        {
          url: "/csc-administration/ServiceServlet", //$.getSingleObject().ajaxurls.getCompanyList,//数据源
          // dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
          pagination: true,//是否分页
          pageSize: 10,//单页记录数
          pageNumber: 1,
          pageList: [5, 10, 20, 50],//分页步进值
          sidePagination: "server",//服务端分页
          contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
          dataType: "json",//期待返回数据类型
          method: "post",//请求方式
          sortName: "voucherCode",
          sortOrder: "desc", //排序方式
          searchAlign: "left",//查询框对齐方式
          queryParamsType: "limit",//查询参数组织方式
          responseHandler: function (res) {
            return res.data
          },
          queryParams: function getParams(params) {
              var query = {};
              //params obj
              // query.companyId = 2000;
              query.addr = 'getVoucherRptList';
              query.token = getToken;
              query.date = (new Date().toGMTString());

              query.dataType = self.state.dataType;
              query.orderCode = $('#kjpzOrderCode').val().trim() == '服务订单号' ? '' : $('#kjpzOrderCode').val().trim();
              query.voucherCode = $('#kjpzVoucherCode').val().trim() == '会计凭证号' ? '' : $('#kjpzVoucherCode').val().trim();
              query.sort = params.sort;
              query.order = params.order;
              // query.compId = JSON.parse(localStorage.bbzx).id;
              query.tenantId = self.state.chooseCompanyData.tenantId;
              // query.compCode = $('#kjCompany').attr('data');
              query.compCode = self.state.chooseCompanyData.companyCode;
              query.startDate = $('#startTime').val();
              query.endDate = $('#endTime').val();
              query.pageSize = params.limit;
              query.pageNumber = Math.ceil(params.offset / params.limit) + 1;
              return query;
          },
          searchOnEnterKey: true,//回车搜索
          // showRefresh: true,//刷新按钮
          // showColumns: true,//列选择按钮
          buttonsAlign: "left",//按钮对齐方式
          toolbar: "#toolbar",//指定工具栏
          toolbarAlign: "right",//工具栏对齐方式
          columns: [
              {
                field: 'Number',
                title: '序号',
                width: 5,//宽度
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                  //return index + 1;
                  var page = $('#kjpzRpt').bootstrapTable("getPage");
                  return page.pageSize * (page.pageNumber - 1) + index + 1;
                }
              },
              {
                title: "公司名称",//标题
                field: "compName",//键名
                width: 20,//宽度
                sortable: true,
                order: "desc"//默认排序方式
              },
              {
                title: "服务订单号",//标题
                field: "orderCode",//键名
                width: 30,//宽度
                formatter: function (value, row, index) {
                  if (row) {
                      return '<a href="kjfwdd.html?orderCode=' + row.orderCode + '&orderId='+ row.orderId  +'" target="_blank">' + value + '</a>';
                  } else {
                      return '-';
                  }
                },
                sortable: true,
                order: "desc"//默认排序方式
              },
              {
                title: "会计凭证号",//标题
                field: "voucherCode",//键名
                width: 40,//宽度
                sortable: true,
                formatter: function (value, row, index) {
                  if (row) {
                      return '<a style="cursor: pointer" class="khpzh" onclick="kjpzAlert(this)" order="' + row.orderCode + '" voucher="' + row.voucherCode + '">' + value + '</a>';
                  } else {
                      return '-';
                  }
                },
                order: "desc"//默认排序方式
              },
              {
                title: "记账日期",//标题
                field: "accountTime",//键名
                width: 40,//宽度
                sortable: true,
                order: "desc"//默认排序方式
              },
              {
                title: "记账类型",//标题
                field: "accountType",//键名
                width: 40,//宽度
                sortable: true,
                order: "desc"//默认排序方式
              },
              {
                title: "作废",//标题
                field: "abrogate",//键名
                width: 40,//宽度
                sortable: true,
                order: "desc"//默认排序方式
              },
              {
                title: "冲销凭证号",//标题
                field: "stblg",//键名
                width: 40,//宽度
                sortable: true,
                formatter: function (value, row, index) {
                  if (row) {
                      if (value != null && value != '') {
                          return '<a style="cursor: pointer" class="khpzh" onclick="kjpzAlert(this)" order="' + row.orderCode + '" voucher="' + row.stblg + '">' + value + '</a>';
                      } else {
                          return '-'
                      }
                  } else {
                      return '-';
                  }
                },
                order: "desc"//默认排序方式
              },
              {
                title: "币种",//标题
                field: "currency",//键名
                width: 40,//宽度
                sortable: true,
                order: "desc"//默认排序方式
              }
          ],
          onClickRow: function (row, $element) {
              //$modelkjpz.modal('show')
          },//单击row事件
          locale: "zh-CN",//中文支持,
          detailView: false //是否显示详情折叠
        }
      )
      $('#pzlb').show();
    }
  }

  changeDataType (type) {
    this.setState({
      dataType: type,
      dataTypeName: type === 0 ? '记账日期' : '凭证创建日期'
    })
  }

  kjpzXls () { // 导出xls
    if (this.state.chooseCompanyData === '') {
      prompt('提示', '请先选择公司');
    } else {
      Store.dispatch({ type: types.maskStatus, payload: true })
      $http('POST',{
        addr: 'exportVoucherRptList',
        compCode: this.state.chooseCompanyData.companyCode,
        dataType: this.state.dataType,
        orderCode: $('#kjpzOrderCode').val().trim() == '服务订单号' ? '' : $('#kjpzOrderCode').val().trim(),
        voucherCode: $('#kjpzVoucherCode').val().trim() == '会计凭证号' ? '' : $('#kjpzVoucherCode').val().trim(),
        startDate: $('#startTime').val(),
        endDate: $('#endTime').val(),
        tenantId: this.state.chooseCompanyData.tenantId
      }, data => {
        window.open(encodeURI(`${this.state.host}${data.data.url}?constomFilename=会计凭证报表&deleteFileFlag=1`));
      });
    }
  }

  //批量导出PDF-会计凭证
  kjpzPDFExps () {
    if (this.state.chooseCompanyData === '') {
      prompt('提示', '请先选择公司');
    } else {
      Store.dispatch({ type: types.maskStatus, payload: true })
      $http('POST',{
        addr: 'exportVoucherList',
        compCode: this.state.chooseCompanyData.companyCode,
        dataType: this.state.dataType,
        orderCode: $('#kjpzOrderCode').val().trim() == '服务订单号' ? '' : $('#kjpzOrderCode').val().trim(),
        voucherCode: $('#kjpzVoucherCode').val().trim() == '会计凭证号' ? '' : $('#kjpzVoucherCode').val().trim(),
        startDate: $('#startTime').val(),
        endDate: $('#endTime').val(),
        tenantId: this.state.chooseCompanyData.tenantId
      }, data => {
        window.open(encodeURI(`${this.state.host}${data.data.url}?downloadConfirm=1&constomFilename=会计凭证&deleteFileFlag=1`));
      });
    }
  }

  //批量打印PDF-会计凭证
  kjpzPDFs () {
    if (this.state.chooseCompanyData === '') {
      prompt('提示', '请先选择公司');
    } else {
      Store.dispatch({ type: types.maskStatus, payload: true })
      $http('POST',{
        addr: 'exportVoucherList',
        compCode: this.state.chooseCompanyData.companyCode,
        dataType: this.state.dataType,
        orderCode: $('#kjpzOrderCode').val().trim() == '服务订单号' ? '' : $('#kjpzOrderCode').val().trim(),
        voucherCode: $('#kjpzVoucherCode').val().trim() == '会计凭证号' ? '' : $('#kjpzVoucherCode').val().trim(),
        startDate: $('#startTime').val(),
        endDate: $('#endTime').val(),
        tenantId: this.state.chooseCompanyData.tenantId
      }, data => {
        window.open(encodeURI(`${this.state.host}${data.data.url}`));
      });
    }
  }

  render () {
    const options = {
      expandBy: 'column'  // Currently, available value is row and column, default is row
    };

    return (
      <section>
        <div className="tab-pane" id="zcfz">
          <div className="v-middle">
            <ToDoLinkAge style="link-age-style" chooseCompany={ this.getChooseCompany.bind(this) } clearData={ this.clearData.bind(this) } />

            <div className="pull-left" style={{ marginRight: '5px' }}>
              <input type="text" style={{ width: '150px', cursor: 'initial', height: '33px' }} className="btn no-radius bg-white p-xs h25 inputList placeholder" id="kjpzOrderCode" placeholder="服务订单号"/>
            </div>

            <div className="pull-left" style={{ marginRight: '5px' }}>
              <input type="text" style={{ width: '120px', cursor: 'initial', height: '33px' }} className="btn no-radius bg-white p-xs h25 inputList placeholder" id="kjpzVoucherCode" placeholder="会计凭证号"/>
            </div>

            <div className="pull-left" style={{ position: 'relative' }}>
              <input style={{ width: '115px', height: '33px', marginTop: '4px', marginTop: '6px \9' }} type="text" id="kjQueryType" className="btn no-radius bg-white p-xs h25 inputList pull-left" value={ this.state.dataTypeName } data-toggle="dropdown" readOnly/>
              <button type="button" style={{ marginTop: '4px', marginTop: '6px \9', backgroundColor: '#ddd', width: '28px', height: '33px' }} className="btn dropdown-toggle cube-xs p-n no-radius pull-left" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="caret"></span>
              </button>

              <ul className="dropdown-menu" id="kjQueryType-dropdown" style={{ left: '0' }}>
                  <li onClick={ this.changeDataType.bind(this, 0) }>记账日期</li>
                  <li onClick={ this.changeDataType.bind(this, 1) }>凭证创建日期</li>
              </ul>
            </div>

            <div className="searchblock">
              <span className="pull-left" style={{ lineHeight: '34px', backgroundColor: '#f3f3f3'}}>查询期间：</span>

              <DoubleTimePicker />
              <div className="clearfix"></div>
            </div>
            <div className="searchblock">
              <button type="submit" className="btn btn-danger m-l-lg btn-custom" data-toggle="modal" data-target="#getData1" onClick={ this.getReports.bind(this) } id="getDataBtn1">查看报表
              </button>
            </div>
            <div className="clearfix"></div>
          </div>
          <div style={{ position: 'relative', display: 'none' }} id="pzlb">
            <div id="kjpz-btn-group" style={{ position: 'absolute', top: '0', right: '0'}}>
              <a href="javascript:;" className="m-l-sm" onClick={ this.kjpzXls.bind(this) }>导出(xls)</a>
              <a href="javascript:;" className="m-l-sm" onClick={ this.kjpzPDFExps.bind(this) }>导出所有凭证(PDF)</a>
              <a href="javascript:;" className="m-l-sm" onClick={ this.kjpzPDFs.bind(this) }>批量打印凭证</a>
            </div>
            <div className="m-t-md m-b-lg" style={{ height: '510px' }}>
              {/* <BootstrapTable data={products} options= { options } striped hover>
                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
              </BootstrapTable> */}
              <table
                data-pagination-pre-text="上一页"
                data-pagination-next-text="下一页"
                data-response-handler="tableResponseHandlerNormal"
                id="kjpzRpt"
                data-side-pagination="server"
                data-pagination="true"
                data-pagination-hasfirstandlast="true"
                data-resizable="true"
                data-click-to-select="true"
                className="table table-hover ">
              </table>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BalanceSheet;
