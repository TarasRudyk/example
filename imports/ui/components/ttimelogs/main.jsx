/* global window */

import React from 'react';
import interact from 'interact.js';

export default class Ttimelogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      tempX: 0,
      width: 100,
      cellWidth: 0
    };

    this.getStyle = this.getStyle.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onResize = this.onResize.bind(this);
    this.updateTracks = this.updateTracks.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.updateTracks);
  }
  componentDidMount() {
    const parentNode = this.textInput.parentNode;

    interact(this.textInput).draggable({
      onmove: this.onDrag,
      restrict: {
        restriction: parentNode,
        elementRect: { left: 0, right: 1, top: 0, bottom: 0 }
      },
      axis: 'x'
    }).resizable({
      edges: { right: true }
    }).on('resizemove', this.onResize);
  }
  componentWillUnmount() {
    window.addEventListener('resize', this.updateTracks);
  }
  onDrag(e) {
    const parentNode = this.textInput.parentNode;
    const cellWidth = parentNode.offsetWidth / 96;

    const posX = this.state.tempX + e.dx;
    const result = Math.floor(posX / cellWidth) * cellWidth;

    this.setState({
      tempX: posX,
      x: result
    });
  }
  onResize(e) {
    const parentNode = this.textInput.parentNode;
    const cellWidth = parentNode.offsetWidth / 96;

    const width = e.rect.width;
    const result = Math.floor(width / cellWidth) * cellWidth;

    if (result !== this.state.width) {
      this.setState({
        width: result
      });
    }
  }
  getStyle() {
    return {
      transform: `translate(${this.state.x}px)`,
      width: `${this.state.width}px`
    };
  }
  updateTracks() {
    console.log('update tracks');
  }
  render() {
    return (
      <div className="container">
        <div className="timelogs">
          <div className="time">
            <div>00:00</div>
            <div>02:00</div>
            <div>04:00</div>
            <div>06:00</div>
            <div>08:00</div>
            <div>10:00</div>
            <div>12:00</div>
            <div>14:00</div>
            <div>16:00</div>
            <div>18:00</div>
            <div>20:00</div>
            <div>22:00</div>
          </div>
          <div className="timelogs-track">
            <div
              className="timelogs-time"
              ref={(input) => { this.textInput = input; }}
              style={this.getStyle()}
            />
          </div>
        </div>
      </div>
    );
  }
}

Ttimelogs.propTypes = {
  name: React.PropTypes.string
};
