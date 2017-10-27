import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

// products will be presented by react-bootstrap-table
export default class Table extends Component {

  handleRowSelect = (row, isSelected) => {
    const { onSelected, position, onStartSelected, onEndSelected } = this.props;
    
    // 提供选择开始和结束的接口
    if (position === 'start') {
      onStartSelected(isSelected, row);
    } else if (position === 'end') {
      onEndSelected(isSelected, row);
    }

    onSelected(isSelected, row)
  }

  handleSelectAll = (isSelected, rows) => {
    const { onSelectedAll } = this.props;

    onSelectedAll(isSelected, rows)
  }

  handleRowClick = (row) => {
    console.log(row)
  }

  getSelectRow = () => {
    let mode = this.props.mode;

    return {
      mode, 
      onSelectAll: this.handleSelectAll, 
      onSelect: this.handleRowSelect
    }
  }

  getOptions = () => {
    return {
      noDataText: '没找到匹配的记录',
      prePage: '<',
      nextPage: '>',
      paginationShowsTotal: (start, to, total) => {
        return (
          <p style={{fontSize: '12px', color: '#909090'}}>
            总共{ total }条几录 当前{ start }/{ to }页          
          </p>
        );
      },
      firstPage: '首页',
      lastPage: '尾页',
      hideSizePerPage: true,
      sizePerPage: 2,
      onRowClick: this.handleRowClick
    }
  }
  

  render () {

    return (
      <BootstrapTable data={this.props.data} 
        hover={true} 
        selectRow={this.getSelectRow()}
        options={this.getOptions()}
        pagination
        handleSelectRow={this.getSelectedRow}
      >
        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center">
          序号
        </TableHeaderColumn>
        <TableHeaderColumn dataField="code">
          代码
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name">
          名称
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
