import React from 'react';
import $ from 'jquery';

class Tooltip extends React.Component {
  handleMouseOver (e) {
    var top = $(e.target).offset().top - $('body').scrollTop() - 5;
    var left = $(e.target).offset().left;
    var thisW = $(e.target).outerWidth();

    $('body').append(`<div class="tooltip-group" style="top: ${ top }px; left: ${ (left+(thisW/2)) }px" ><p class="text">${ this.props.title }</p><span class="border-bottom"></span></div>`);
  }

  handleMouseOut () {
    $('.tooltip-group').remove();
  }

  render () {
    return (
      <div onMouseOver={ this.handleMouseOver.bind(this) } onMouseOut={ this.handleMouseOut.bind(this) }>
        { this.props.children }
      </div>
    )
  }
}

export default Tooltip;
