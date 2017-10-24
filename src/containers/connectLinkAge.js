import {connect} from 'react-redux';
import LinkAge from '../components/linkage.js';
import FetchPosts from '../actions/Actions.js';
import types from '../actionTypes/types.js';

const mapStateToProps = (state) => {
  return {
    'tenant': () => {
      if (state.resetdroplist) {
        let data = JSON.parse(JSON.stringify(state.resetdroplist));
        let init = [{ // 租户列表;
                      'key': 0,
                      'bussLicenseNo': null,
                      'tenantCode': '',
                      'tenantId': '',
                      'tenantName': '全部'
                    }];
        if (data.data && data.data.length) {
          data.data.forEach(function (item, index) {
            item.key = index + 1;
            item.tenantName = item.tenantCode + ' ' + item.tenantName;
          });
        }

        return init.concat(data.data)
      }
    },
    'company': () => {
      if (state.companyList) {
        let data = JSON.parse(JSON.stringify(state.companyList));
        let init = [{ // 公司列表;
                      'key': 0,
                      'companyCode': undefined,
                      'companyDesc': null,
                      'companyId': '',
                      'companyName': '全部',
                      'tenantCode': null,
                      'tenantId': '',
                      'tenantName': null
                   }];
        if (data.data.rows && data.data.rows.length) {
          data.data.rows.forEach(function (item, index) {
            item.key = index + 1;
            item.companyName = item.companyCode + ' ' + item.companyName;
          })
        }

        return init.concat(data.data.rows)
      }
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    'getResetdroplist': (parms) => dispatch(FetchPosts(parms, types.tenantData)),
    'getCompanylist': (parms) => dispatch(FetchPosts(parms, types.companyList))
  }
}

const ToDoLinkAge = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkAge)

export default ToDoLinkAge;
