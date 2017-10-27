import React from 'react';

class TableContent extends React.Component {
  formatterMoney (s) { // 对数字进行过滤
    if (s) {
      var n = 2;
      n = n > 0 && n <= 20 ? n : 2;
      var s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      return t.split("").reverse().join("") + "." + r;
    } else {
      return ''
    }
  }

  render () {
    const { tableListData } = this.props;

    return (
      <div style={{ padding: '25px 40px 0' }}>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>项目</th>
              <th>本期累计数</th>
              <th>本年累计数</th>
              <th>上年同期累计数</th>
            </tr>
            </thead>
            <tbody>
            {
              tableListData ? tableListData.data.map((item,index) => {
                return (
                  <tr key={index}>
                    <td title={item.name} className="w264 max-w264">{item.name}</td>
                    <td className="w112_right">{this.formatterMoney(item.currentPeriod)}</td>
                    <td className="w112_right">{this.formatterMoney(item.currentYear)}</td>
                    <td className="w112_right">{this.formatterMoney(item.lastCurrentPeriod)}</td>
                  </tr>
                )
              })
              :
              ''
            }

          </tbody>
        </table>
      </div>
    )
  }
}

export default TableContent;
