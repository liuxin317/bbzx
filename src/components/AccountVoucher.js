import { Tooltip } from 'antd';

import React from 'react';
import $ from 'jquery';
import Store from '../stores/store';
import types from '../actionTypes/types';
import { $http } from '../common/http';

class AccountingVoucher extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      host: window.location.protocol+'//'+window.location.host+'/csc-administration/download/' // 下载域名路径
    }
  }

  exportPDF () { // 导出凭证PDF;
    var self = this;
    Store.dispatch({ type: types.maskStatus, payload: true });

    $http('POST', {
      addr: 'exportVoucher',
      orderCode: this.props.accountData.orderCode,
      voucherCode: this.props.accountData.voucherCode
    }, res => {
      setTimeout(() => {
        window.open(encodeURI(self.state.host+res.data.url + '?constomFilename=会计凭证报表&deleteFileFlag=1'));
      }, 500)
    })
  }

  kjpzPDF () { // 打印凭证;
    var self = this;
    Store.dispatch({ type: types.maskStatus, payload: true });

    $http('POST', {
      addr: 'exportVoucher',
      orderCode: this.props.accountData.orderCode,
      voucherCode: this.props.accountData.voucherCode
    }, res => {
      setTimeout(() => {
        window.open(encodeURI(self.state.host+res.data.url));
      }, 500)
    })
  }

  render () {
    if (this.props.accountData) {
      var accHead = this.props.accountData.accHead;
      var tableHead = this.props.accountData.head;
      var detail = this.props.accountData.detail;
      var elimination = this.props.accountData.elimination;
      var accLinkDefineTails = this.props.accountData.accLinkDefineTails;
      var orderId = this.props.accountData.orderId;
    }

    return (
      this.props.accountData ?
      <div id="getData5" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
       aria-hidden="true">
        <div className="modal-dialog" style={{ width: '85%' }}>
          <div className="modal-content">
            <div style={{ padding: '15px 15px 0' }}>
              <button type="submit" id="kjpzPDFExp" onClick={ this.exportPDF.bind(this) } className="btn btn-danger m-l-sm no-border">导出PDF
              </button>
              <button type="submit" id="kjpzPDF" onClick={ this.kjpzPDF.bind(this) } className="btn btn-danger m-l-sm no-border">打印
              </button>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">×</span><span className="sr-only">Close</span>
              </button>
              <div className="switch-window">
                <i className="fa fa-window-maximize" style={{ display: 'block' }}></i>
                <i className="fa fa-window-restore" style={{ display: 'none' }}></i>
              </div>
            </div>
            <div className="modal-header" style={{ paddingTop: '0' }}>
              <h4 className="modal-title text-center">会计凭证</h4>
            </div>
            {
              elimination === 0 ? <div className="signet"></div> : ''
            }
            <div className="modal-body">
              <div style={{ overflow: 'auto' }}>
                {
                  accHead.map((item)=> {
                    return (
                      <div key={ item.key } className="col-md-3 kjpz-col-box">
                        <span className="data-toggle-tooltip kjpz-col kjpz-col-label">
                          {item.key}：
                        </span>
                        {
                          item.key.indexOf('订单号') > -1
                          ?
                          <a target="_blank" href={ '/csc-administration/views/kjfwdd.html?' + item.value + '&orderId=' + orderId } style={{ color: '#333' }}>
                            <Tooltip title={ item.value }>
                              <span className="data-toggle-tooltip kjpz-col">
                                {item.value}
                              </span>
                            </Tooltip>
                          </a>
                          :
                          <Tooltip title={ item.value }>
                            <span className="data-toggle-tooltip kjpz-col">
                              {item.value}
                            </span>
                          </Tooltip>
                        }
                      </div>
                    )
                 })
                }
              </div>
              <div style={{ overflow: 'auto' }}>
                <table style={{ width: '100%' }} className="text-center m-t table">
                  <tbody>
                    <tr>
                      {
                        tableHead.map((item, index) => {
                          return (
                            <td key={ index } style={{ whiteSpace: 'nowrap' }}> { item } </td>
                          )
                        })
                      }
                    </tr>
                    {
                      detail.map((item, index) => {
                        return (
                          <tr key={ index }>
                            {
                              item.map((val, idx) => {
                                return (
                                  <Tooltip title={ val }>
                                    <td key={ idx } style={{ whiteSpace: 'nowrap' }} className="data-toggle-tooltip">{ val }</td>
                                  </Tooltip>
                                )
                              })
                            }
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="row m-t">
                {
                  accLinkDefineTails
                  ?
                  accLinkDefineTails.map((item, index) => {
                    return (
                      <div key={ index } className="col-md-3">
                      {
                        item.alias
                        ?
                          <span>{ item.alias }：{ item.value }</span>
                        :
                          <span>{ item.name }：{ item.value }</span>
                      }
                      </div>
                    )
                  })
                  :
                  ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <p></p>
    )
  }
}

export default AccountingVoucher;
