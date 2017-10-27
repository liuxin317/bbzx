import React from 'react';

class RightTable extends React.Component {
  render () {
    const { tableData } = this.props;

    return (
      <div className="tab-content m-l-250">
        {
          tableData ?
          <div className="min-h571" style={{ backgroundColor: '#c3c3c3' }}>
              <h1 className="p-v-md text-center m-n-t">{ tableData.reportInfo.name }</h1>
              <div className="p-list flex b-b-weight" style={{ height: '32px' }}>
                  <div className="fs14 font-weight p-l-xxxs w-42 pull-left">
                      单位：{ tableData.reportInfo.compName }
                  </div>
                  <div className="fs14 font-weight w-38 pull-left">
                      会计日期：{ tableData.reportInfo.period }
                  </div>
                  <div className="fs14 font-weight w-20 pull-left">单位：{ tableData.reportInfo.unit }</div>
                  <div className="clear"></div>
              </div>
              <div className="m-t-xxss b-b-light"></div>

              { this.props.children }

              <div className="p-list flex b-b-light">
                  <div className="fs14 font-weight p-l-xxxs w-42 pull-left">
                      法定代表人：{tableData.approcal.legal}
                  </div>
                  <div className="fs14 font-weight w-38 pull-left">主管会计工作负责人：{tableData.approcal.accounting}</div>
                  <div className="fs14 font-weight w-20 pull-left">会计机构负责人：{tableData.approcal.institution}</div>
                  <div className="clear"></div>
              </div>
              <div className="m-t-xxss b-t-weight clear"></div>
          </div>
          :
          ''
        }
      </div>
    )
  }
}

export default RightTable;
