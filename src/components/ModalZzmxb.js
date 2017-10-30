import React, { Component } from 'react';
import $ from 'jquery';
import { $http, prompt, getToken } from '../common/http.js';
require('../styles/bootstrap/js/bootstrap.min');
require('../styles/table-group');

export default class Modal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // 弹窗显示隐藏
      modalVisibility: false,
      // 选中的科目列表
      selectedSubject: [],
      // 选中的tab标签
      tabName: 'first',
      // 区间科目代码
      startCode: '',
      endCode: '',
      // 单独选择的科目代码
      selectedCodes: []
    }
  }

  componentDidMount () {
    var self = this;

    setTimeout(() => {
      $('.no-hide').on('click', function (e) {
        e.stopPropagation();
      })


      $('.searchEQ').on('click', function (e) {
        if (!self.state.selectedCodes.length) {
          e.stopPropagation();
          prompt('提示', '科目代码为空')
        } else {
          self.handleSearchClick('EQ')
        }
      })

      $('.searchBT').on('click', function (e) {
        if (self.state.startCode === '' || self.state.endCode === '') {
          e.stopPropagation();
          prompt('提示', '起始和截止科目代码不能为空')
        } else {
          self.handleSearchClick('BT')
        }
      })
    }, 1000)
  }

  // 选项卡标签点击
  handleTabClick = (str) => {
    this.props.subjectList.forEach((item) => {
      item.state = false;
    })

    this.setState({ selectedSubject: [], selectedCodes: [], startCode: '', endCode: '', tabName: str })
  }

  // 点击查询按钮
  handleSearchClick (type) {
    if (type === 'EQ') { // 区间;
      if (!this.state.selectedCodes.length) {
        prompt('提示', '科目代码为空')
      } else {
        let obj = {}
        obj.selectedStr = type;
        obj.subjectCodeStr = '';

        this.state.selectedCodes.forEach((item) => {
          obj.subjectCodeStr += `${item.code};`
        })

        obj.subjectCodeStr = obj.subjectCodeStr.substr(0, obj.subjectCodeStr.length - 1)
        this.props.onModalData(obj);
      }
    } else if (type === 'BT') {
      if (this.state.startCode === '' || this.state.endCode === '') {
        prompt('提示', '起始和截止科目代码不能为空')
      } else {
        let obj = {}
        obj.selectedStr = type;
        obj.subjectCodeStr = `${this.state.startCode};${this.state.endCode}`;

        this.props.onModalData(obj);
      }
    }
  }

  clearData () { // 清除数据
    this.setState({
      selectedCodes: []
    })
  }

  // 科目代码表格-总账明细
  kmdmTable () {
    //先销毁表格
    var self = this;
    $('#kmdmcx1').bootstrapTable('destroy');
    $('#kmdmcx1').bootstrapTable(
        {
            // url: "/csc-administration/ServiceServlet", //$.getSingleObject().ajaxurls.getCompanyList,//数据源
            // dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
            pagination: true,//是否分页
            clickToSelect: true,
            maintainSelected: true,
            pageSize: 2,//单页记录数
            pageNumber: 1,
            pageList: [5, 10, 20, 50],//分页步进值
            // sidePagination: "server",//服务端分页
            // contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
            // dataType: "json",//期待返回数据类型
            // method: "post",//请求方式
            //searchAlign: "left",//查询框对齐方式
            queryParamsType: "limit",//查询参数组织方式
            data: self.props.subjectList,
            // searchOnEnterKey: true,//回车搜索
            //showRefresh: true,//刷新按钮
            //showColumns: true,//列选择按钮
            //buttonsAlign: "left",//按钮对齐方式
            //toolbar: "#toolbar",//指定工具栏
            //toolbarAlign: "right",//工具栏对齐方式
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
                        return index + 1;
                    }
                },
                {
                    title: "代码",//标题
                    field: "code",//键名
                    width: 50,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    order: "desc"//默认排序方式
                },
                {
                    title: "名称",//标题
                    field: "name",//键名
                    width: 50,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    order: "desc"//默认排序方式
                }
            ],
            onCheck: function (row) {
              var selectedCodes = self.state.selectedCodes;
              selectedCodes.push(row)

              self.setState({
                selectedCodes: selectedCodes
              })
            },
            onUncheck: function (row) {
              var selectedCodes = self.state.selectedCodes;

              selectedCodes.forEach((item, index) => {
                if (item.id == row.id) {
                  selectedCodes.splice(index, 1)
                }
              })

              self.setState({
                selectedCodes: selectedCodes
              })
            },
            onCheckAll: function (row) {
              self.setState({
                selectedCodes: row
              })
            },
            onUncheckAll: function (row) {
              self.setState({
                selectedCodes: []
              })

              row.forEach((item) => {
                item.state = false;
              })
            },
            locale: "zh-CN",//中文支持,
            //detailView: false //是否显示详情折叠
        }
    );
  }

  // 截止代码
  qjEnd () {
    //先销毁表格
    var self = this;

    $('#btend').bootstrapTable('destroy');
    $('#btend').bootstrapTable(
        {
            // url: "/csc-administration/ServiceServlet", //$.getSingleObject().ajaxurls.getCompanyList,//数据源
            // dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
            pagination: true,//是否分页
            clickToSelect: true,
            // maintainSelected: true,
            pageSize: 2,//单页记录数
            pageNumber: 1,
            pageList: [5, 10, 20, 50],//分页步进值
            // sidePagination: "server",//服务端分页
            // contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
            // dataType: "json",//期待返回数据类型
            // method: "post",//请求方式
            //searchAlign: "left",//查询框对齐方式
            queryParamsType: "limit",//查询参数组织方式
            data: self.props.subjectList,
            // searchOnEnterKey: true,//回车搜索
            //showRefresh: true,//刷新按钮
            //showColumns: true,//列选择按钮
            //buttonsAlign: "left",//按钮对齐方式
            //toolbar: "#toolbar",//指定工具栏
            //toolbarAlign: "right",//工具栏对齐方式
            columns: [
                {
                    field: 'Number',
                    title: '序号',
                    width: 15,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                },
                {
                    title: "代码",//标题
                    field: "code",//键名
                    width: 50,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    order: "desc"//默认排序方式
                },
                {
                    title: "名称",//标题
                    field: "name",//键名
                    width: 50,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    order: "desc"//默认排序方式
                }
            ],
            onClickRow: function (row) {
              if (self.state.startCode) {
                if (Number(row.code) <= Number(self.state.startCode)) {
                  prompt('提示', '起始代码必须小于截止代码')
                } else {
                  self.setState({
                    endCode: row.code
                  })
                }
              } else {
                self.setState({
                  endCode: row.code
                })
              }
            },
            locale: "zh-CN",//中文支持,
            //detailView: false //是否显示详情折叠
        }
    );
  }

  // 起始代码;
  qjStart () {
    //先销毁表格
    var self = this;

    $('#btstart').bootstrapTable('destroy');
    $('#btstart').bootstrapTable(
        {
            // url: "/csc-administration/ServiceServlet", //$.getSingleObject().ajaxurls.getCompanyList,//数据源
            // dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
            pagination: true,//是否分页
            clickToSelect: true,
            // maintainSelected: true,
            pageSize: 2,//单页记录数
            pageNumber: 1,
            pageList: [5, 10, 20, 50],//分页步进值
            // sidePagination: "server",//服务端分页
            // contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
            // dataType: "json",//期待返回数据类型
            // method: "post",//请求方式
            //searchAlign: "left",//查询框对齐方式
            queryParamsType: "limit",//查询参数组织方式
            data: self.props.subjectList,
            // searchOnEnterKey: true,//回车搜索
            //showRefresh: true,//刷新按钮
            //showColumns: true,//列选择按钮
            //buttonsAlign: "left",//按钮对齐方式
            //toolbar: "#toolbar",//指定工具栏
            //toolbarAlign: "right",//工具栏对齐方式
            columns: [
                {
                    field: 'Number',
                    title: '序号',
                    width: 15,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                },
                {
                    title: "代码",//标题
                    field: "code",//键名
                    width: 50,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    order: "desc"//默认排序方式
                },
                {
                    title: "名称",//标题
                    field: "name",//键名
                    width: 50,//宽度
                    align: "center",//水平
                    valign: "middle",//垂直
                    order: "desc"//默认排序方式
                }
            ],
            onClickRow: function (row) {
              if (self.state.endCode) {
                if (Number(row.code) >= Number(self.state.endCode)) {
                  prompt('提示', '起始代码必须小于截止代码')
                } else {
                  self.setState({
                    startCode: row.code
                  })
                }
              } else {
                self.setState({
                  startCode: row.code
                })
              }
            },
            locale: "zh-CN",//中文支持,
            //detailView: false //是否显示详情折叠
        }
    );
  }

  render () {
    const { selectedCodes } = this.state;
    let selectedNames = '';

    if (this.state.selectedCodes) {
      this.state.selectedCodes.forEach((item) => {
        selectedNames += `${item.code},`
      })

      selectedNames = selectedNames.substr(0, selectedNames.length -1);
    }

    return (
      <div id="getData4" className="modal fade" tabIndex="-1" role="dialog"   aria-labelledby="mySmallModalLabel" aria-hidden="true"
      onClick={this.test}
      style={
        this.state.modalVisibility
        ? { display: 'block' }
        : { display: 'none' }
      }>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-body">
              <ul className="nav nav-tabs btn-group">
                <li role="presentation" data-toggle="tab" data-target="#dzcx" className="active"
                  onClick={() => this.handleTabClick('first')}
                ><a>单值查询</a></li>
                <li role="presentation" data-toggle="tab" data-target="#qjcx"
                  onClick={() => this.handleTabClick('second')}
                ><a>区间查询</a></li>
              </ul>
              <div className="tab-content" style={{padding: '15px 15px 0'}}>
                <div className="tab-pane active" id="dzcx" style={{backgroundColor: '#FFF'}}>
                    <div>
                      <span className="pull-left" style={{width: '120px'}}>科目代码：</span>
                      <div className="pull-right" id="kuaijipingzheng">
                          <input type="text" id="kmdm1" style={{width: '360px'}}
                            className="pull-left btn no-radius bg-white p-xs h25 inputList"
                             readOnly value={ selectedNames } data-toggle="dropdown" onClick={this.kmdmTable.bind(this)}/>
                          <button type="button" className="pull-left btn dropdown-toggle cube-xs p-n no-radius"
                            style={{marginRight: '0'}} onClick={this.kmdmTable.bind(this)}
                            aria-haspopup="true" data-toggle="dropdown" aria-expanded="false">
                            <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu no-hide" style={{top: '97px', left: '182px'}}>
                            <div>
                              <table data-response-handler="tableResponseHandlerChecks" id="kmdmcx1" className="table table-hover"></table>
                            </div>
                          </ul>
                          <div style={{clear: 'both'}}></div>
                      </div>
                      <div style={{clear: 'both'}}></div>
                    </div>
                    <div className="m-t-sm">
                      <span className="pull-left" style={{width: '120px'}}>已选科目代码：</span>
                      <textarea className="pull-right" id="kmdmarea" style={{height:'100px',width: '385px'}}  value={ selectedNames } readOnly></textarea>
                      <div style={{clear: 'both'}}></div>
                    </div>
                    <div className="text-right m-t-sm">
                      <button type="button" className="btn btn-primary searchEQ" data-dismiss="modal">查询</button>
                      <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
                <div className="tab-pane" id="qjcx" style={{backgroundColor: '#FFF'}}>
                    <div className="space-between">
                        <span className="pull-left" style={{width: '100px'}}>科目代码：</span>
                        <div className="pull-right flex">
                            <span className="flex">
                              <input type="text" id="kmdm2" style={{width: '180px'}}
                                className="pull-left btn no-radius bg-white p-xs h25 inputList"
                                value={this.state.startCode}
                                data-toggle="dropdown" onClick={ this.qjStart.bind(this) } readOnly/>
                              <button type="button" className="pull-left btn dropdown-toggle cube-xs p-n no-radius"
                                data-toggle="dropdown"
                                aria-haspopup="true" onClick={ this.qjStart.bind(this) } aria-expanded="false">
                                <span className="caret"></span>
                              </button>
                              <ul className="dropdown-menu" style={{top: '96px', left: '123px', width: '396px'}}>
                                <table data-response-handler="tableResponseHandler" id="btstart" className="table table-hover"></table>
                                <div style={{clear: 'both'}}></div>
                              </ul>
                            </span>
                            <span className="pull-left m-l-xs m-r-xs v-middle">到</span>
                            <span className="flex">
                              <input type="text" id="kmdm3" style={{width: '180px'}}
                                className="pull-left btn no-radius bg-white p-xs h25 inputList"
                                value={this.state.endCode}
                                data-toggle="dropdown" onClick={ this.qjEnd.bind(this) } readOnly/>
                              <button type="button"
                                className="pull-left btn dropdown-toggle cube-xs p-n no-radius"
                                data-toggle="dropdown"
                                aria-haspopup="true"  onClick={ this.qjEnd.bind(this) } aria-expanded="false">
                                <span className="caret"></span>
                              </button>
                            <ul className="dropdown-menu" style={{top: '96px', left: '356px', width: '396px'}}>
                              <table data-response-handler="tableResponseHandler" id="btend" className="table table-hover"></table>
                            </ul>
                              <div style={{clear: 'both'}}></div>
                            </span>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    <div className="space-between m-t-sm" style={{height: '100px'}}>
                      <span>注意：起始代码必须小于截止代码</span>
                    </div>
                    <div className="text-right m-t-sm">
                      <button type="button" className="btn btn-primary searchBT" data-dismiss="modal">
                        查询
                      </button>
                      <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
