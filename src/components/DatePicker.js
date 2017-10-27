import $ from 'jquery';
import React, { Component } from 'react';

require('../styles/datepicker/bootstrap-datetimepicker.js');

/**
 * DatePicker为纯jq插件，使用的是节点操作，未重构成react组件
 */

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


//单个日期控件 控件id，日期格式，起始模式年/月/日
export const SingleTimePicker = class SingleTimePicker extends Component {

  singleTimePicker = (id, format, startView) => {
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
  
  componentDidMount () {
    this.singleTimePicker("#setYear4", "yyyy", 4);
  }

  render () {
    const iconStyle = {
      'pointerEvents': 'none',
      'position': 'absolute',
      'right': '0px',
      'top': '0px',
      'zIndex': '10'
    }
    return (
      <div className="pull-left">
        <div id="dp4" className="input-append date form_datetime w150">
          <input id="setYear4" className="form-control" type="text" readOnly />
          <span style={iconStyle} className="dateicon"></span>
        </div>
      </div>
    )
  }
}

//双日期控件，起始小于截至日期
export const DoubleTimePicker = class DoubleTimePicker extends Component {

  doubleTimePicker = (start, end, format, startView, minView) => {
    $(start).datetimepicker({
      language: 'zh-CN',
      format: format,
      weekStart: 0,
      todayBtn: true,
      autoclose: true,
      todayHighlight: false,
      startView: startView,
      minView: minView,
      forceParse: false
    }).on('changeDate', function (ev) {
        if (ev.date) {
            $(end).datetimepicker('setStartDate', new Date(ev.date.valueOf()))
        } else {
            $(end).datetimepicker('update', null);
            $(end).datetimepicker('setStartDate', null);
        }
    });
    $(end).datetimepicker({
        language: 'zh-CN',
        format: format,
        weekStart: 0,
        todayBtn: true,
        autoclose: true,
        todayHighlight: false,
        startView: startView,
        minView: minView,
        forceParse: false
    }).on('changeDate', function (ev) {
        if (ev.date) {
            $(start).datetimepicker('setEndDate', new Date(ev.date.valueOf()))
        } else {
            $(start).datetimepicker('update', null);
            $(start).datetimepicker('setEndDate', new Date());
        }
    });
    $(start).datetimepicker('update', (new Date()));
    $(start).datetimepicker('setEndDate', new Date());
    $(end).datetimepicker('setStartDate', new Date());
    $(end).datetimepicker('update', (new Date()));
  }

  componentDidMount () {
    var timeYear, timeMonth, timeDay;
    var time = new Date();
    timeYear = time.getFullYear();
    timeMonth = (time.getMonth() + 1) < 10 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
    timeDay = '01';

    this.doubleTimePicker("#startTime", "#endTime", "yyyy-mm-dd", 2, 3);
    $('#startTime').datetimepicker('update', new Date(timeYear + '-' + timeMonth + '-' + timeDay));
  }

  render () {
    const iconStyle = {
      'pointerEvents': 'none',
      'position': 'absolute',
      'right': '0px',
      'top': '0px',
      'zIndex': '10'
    }
    return (
      <div className="pull-left input-daterange input-group form_datetime" style={{width: '250px'}}>
        <div className="w150">
          <input type="text" className="input-sm form-control fs14 h34" id="startTime" readOnly/>
          <span style={iconStyle} className="dateicon"></span>
        </div>
        <span className="input-group-addon">到</span>
        <div className="w150">
          <input type="text" className="input-sm form-control fs14 h34" id="endTime" readOnly/>
          <span style={iconStyle} className="dateicon"></span>
        </div>
      </div>
    );
  }
}
