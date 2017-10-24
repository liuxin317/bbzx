import React from 'react';

class LeftSwitch extends React.Component {
  render () {
    var list = this.props.switchData.list;

    return (
      <ul id="monthCode1" className="nav nav-pills nav-stacked w250 pull-left">
          {
            list ? list.map( item => {
              return (
                <li key={ item.id } role="presentation" data-toggle="tab" className={ item.classInfo }>
                  <a className="no-radius" href="javascript: " onClick={ this.props.switchTable.bind(this, item.code) }> { item.name } </a>
                </li>
              )
            })
            :
            ''
          }
      </ul>
    )
  }
}

export default LeftSwitch;
