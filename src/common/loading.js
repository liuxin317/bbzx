import React from 'react';

export default class Load extends React.Component {
  render () {
    var active = {
      display: this.props.state.maskStatus ? 'block' : 'none'
    }

    return (
      <div id="progress-continer" className="progress-continer" style={active}>
        <div className="progress-div">
            <div style={{ margin: -50 + 'px' }}>
                <div style={{width:95 + 'px', height: 95 + 'px', margin: '0px auto 10px'}}>
                    <div style={{position:'absolute', background: 'url(../icon/loading1.png) no-repeat center #6a6a6a', width: 95 + 'px', height: 95 + 'px', borderRadius: '100%'}}>
                    </div>
                    <div id='progress-circle' style={{ position: 'absolute', background: 'url(../icon/loading2.png) center center no-repeat', width: 95 + 'px', height: 95 + 'px', borderRadius: '100%', animation: 'rotate 4s linear infinite', WebkitAnimation: 'rotate 4s linear infinite', MozAnimation: 'rotate 4s linear infinite', OAnimation: 'rotate 4s linear infinite', msAnimation: 'rotate 4s linear infinite', transform: 'rotate(0deg)', transformOrigin: '50% 50% 0px' }}></div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
