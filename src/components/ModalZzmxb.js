import React, { Component } from 'react';

import Table from './../components/Table';
import { prompt } from '../common/http.js';

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

  componentWillMount () {

  }

  // 单独选择
  handleOnSelected = (flag, row) => {
    let arr = this.state.selectedSubject;

    // 多选逻辑
    if (flag) {
      arr.push(row)
    } else {
      // 找出相同的并删除
      arr.forEach((item, index) => {
        if (item.id === row.id) {
          arr.splice(index, 1);
        }
      })
    }
    
    this.getSubjectCodes(arr);
    this.setState({ selectedSubject: arr });
  }

  // 全选
  handleOnSelectedAll = (flag, rows) => {
    let arr = this.state.selectedSubject;

    if (flag) {
      arr = rows;
    } else {
      arr = [];
    }

    this.getSubjectCodes(arr);
    this.setState({ selectedSubject: arr });
  }

  // 选择开始代码
  handleStartSeleted = (flag, row) => {
    let str = '';
    let endCode = this.state.endCode;

    if (flag) {
      if (row.code >= endCode) {
        str = row.code;
      } else {
        if (endCode) {
          alert('开始代码不能大于结束代码');
        }
        str = '';
      }
    } else {
      str = '';
    }

    this.setState({ startCode: str });
  }

  // 选择结束代码
  handleEndSeleted = (flag, row) => {
    let str = '';
    let startCode = this.state.startCode;

    if (flag) {
      if (row.code <= startCode) {
        str = row.code;
      } else {
        if (startCode) {
          alert('结束代码不能小于开始代码');
        }
        
        str = '';
      }
    } else {
      str = '';
    }
    
    this.setState({ endCode: str });
  }

  getSubjectCodes = (arr) => {
    let selectedCodes = arr.map(item => {
      return item.code;
    })

    this.setState({selectedCodes});
  }

  // 选项卡标签点击
  handleTabClick = (str) => {
    this.setState({ selectedSubject: [], selectedCodes: [], startCode: '', endCode: '', tabName: str })
  }

  // 点击查询按钮
  handleSearchClick = (e) => {

    const { onModalData } = this.props;
    const EQ = 'EQ'; // 单独选择的标志
    const BT = 'BT'; // 区间选择的标志
    
    let obj = {};

    if (this.state.tabName === 'first') {
      obj['selectedStr'] = EQ
      obj['subjectCodeStr'] = this.state.selectedCodes.join(';');
    } else {
      obj['selectedStr'] = BT
      obj['subjectCodeStr'] = this.state.startCode + ';' + this.state.endCode;
    }

    console.log(obj['subjectCodeStr'])
    if (!obj['subjectCodeStr']) {
      console.log(412312)
      onModalData(obj);
      this.state.modalVisibility = true;
    } else {
      prompt('提示', '请选择科目代码');
    }
  }

  test = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  render () {
    const { selectedCodes } = this.state;

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
                      <div className="pull-left" id="kuaijipingzheng">
                          <input type="text" id="kmdm1" style={{width: '360px'}}
                            className="pull-left btn no-radius bg-white p-xs h25 inputList"
                            data-toggle="dropdown" readOnly
                            value={this.state.selectedCodes.join(',')}/>
                          <button type="button" className="pull-left btn dropdown-toggle cube-xs p-n no-radius"
                            style={{marginRight: '0'}} 
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu" style={{top: '97px', left: '150px'}} 
                          onClick={this.test}>
                            <div style={{padding: '15px'}}>
                              {
                                this.state.tabName === 'first'
                                ? (
                                    <Table data={this.props.subjectList}
                                      mode="checkbox"
                                      onSelected={this.handleOnSelected}
                                      onSelectedAll={this.handleOnSelectedAll}
                                    />
                                  )
                                : ''
                              }
                            </div>
                          </ul>
                          <div style={{clear: 'both'}}></div>
                      </div>
                      <div style={{clear: 'both'}}></div>
                    </div>
                    <div className="m-t-sm">
                      <span className="pull-left" style={{width: '120px'}}>已选科目代码：</span>
                      <textarea className="pull-left" id="kmdmarea" style={{height:'100px',width: '385px'}} readOnly value={this.state.selectedCodes.join(',')}></textarea>
                      <div style={{clear: 'both'}}></div>
                    </div>
                    <div className="text-right m-t-sm">
                      <button type="button" className="btn btn-primary" data-dismiss="modal"
                      onClick={this.handleSearchClick}>查询</button>
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
                                data-toggle="dropdown" readOnly/>
                              <button type="button" className="pull-left btn dropdown-toggle cube-xs p-n no-radius"
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span className="caret"></span>
                              </button>
                              <ul className="dropdown-menu" style={{top: '96px', left: '123px', width: '396px'}}>
                                <div style={{padding: '15px'}}>
                                  {
                                    this.state.tabName === 'second'
                                    ? (
                                        <Table data={this.props.subjectList}
                                          mode="radio"
                                          position="start"
                                          onSelected={this.handleOnSelected}
                                          onSelectedAll={this.handleOnSelectedAll}
                                          onStartSelected={this.handleStartSeleted}
                                        />
                                      )
                                    : ''
                                  }
                                </div>
                                <div style={{clear: 'both'}}></div>
                              </ul>
                            </span>
                            <span className="pull-left m-l-xs m-r-xs v-middle">到</span>
                            <span className="flex">
                              <input type="text" id="kmdm3" style={{width: '180px'}}
                                className="pull-left btn no-radius bg-white p-xs h25 inputList" 
                                value={this.state.endCode}
                                data-toggle="dropdown" readOnly/>
                              <button type="button"
                                className="pull-left btn dropdown-toggle cube-xs p-n no-radius"
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span className="caret"></span>
                              </button>
                            <ul className="dropdown-menu" style={{top: '96px', left: '356px', width: '396px'}}>
                              <div style={{padding: '15px'}}>
                                {
                                  this.state.tabName === 'second'
                                  ? (
                                      <Table data={this.props.subjectList}
                                        mode="radio"
                                        position="end"
                                        onSelected={this.handleOnSelected}
                                        onSelectedAll={this.handleOnSelectedAll}
                                        onEndSelected={this.handleEndSeleted}
                                      />
                                    )
                                  : ''
                                }
                              </div>
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
                      <button type="button" className="btn btn-primary" data-dismiss="modal"
                        onClick={this.handleSearchClick}>
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
