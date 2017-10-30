import React from 'react';
import Loading1 from '../icon/loading1.png';
import Loading2 from '../icon/loading2.png';

export default class Load extends React.Component {
  render () {
    var active = {
      display: this.props.state.maskStatus ? 'block' : 'none'
    }

    var loadStyle1 = {
      position:'absolute',
      background: 'url('+ Loading1 +') no-repeat center #6a6a6a',
      width: 95 + 'px',
      height: 95 + 'px',
      borderRadius: '100%'}

    var loadStyle2 = {
      position: 'absolute',
      background: 'url('+ Loading2 +') center center no-repeat',
      width: 95 + 'px', height: 95 + 'px',
      borderRadius: '100%',
      animation: 'rotate 4s linear infinite',
      WebkitAnimation: 'rotate 4s linear infinite',
      MozAnimation: 'rotate 4s linear infinite',
      OAnimation: 'rotate 4s linear infinite',
      msAnimation: 'rotate 4s linear infinite',
      transform: 'rotate(0deg)',
      transformOrigin: '50% 50% 0px'
    }

    return (
      <div id="progress-continer" className="progress-continer" style={active}>
        <div className="progress-div">
            <div style={{ margin: -50 + 'px' }}>
                <div style={{width:95 + 'px', height: 95 + 'px', margin: '0px auto 10px'}}>
                    <div style={loadStyle1}>
                    </div>
                    <div id='progress-circle' style={loadStyle2}></div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
