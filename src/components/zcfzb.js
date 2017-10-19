import React from 'react';
import $ from 'jquery';
import { $http, prompt } from '../common/http.js';
import Linkage from '../common/linkage.js';

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
    super(props)
  }

  componentDidMount () {
    singleTimePicker('#setYear1', 'yyyy', 4); // 日期控件;
  }

  getChooseCompany () { // 获取选中公司数据;
    // console.log(data);
  }

  render () {
    return (
      <section>
        <div className="tab-pane" id="zcfz">
          <div className="v-middle">
            <Linkage chooseCompany={this.getChooseCompany} />
            <div className="searchblock">
              <span>会计年度：</span>

              <div id="dp1" className="input-append date form_datetime w150">
                <input id="setYear1" className="form-control" type="text" readonly />
                <span
                  style={{ pointerEvents: 'none', position: 'absolute', right: '0px', top: '0px' }}
                  className="dateicon">
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BalanceSheet
