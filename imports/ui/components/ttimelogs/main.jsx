import React from 'react';
import interact from 'interact.js';

export default class Ttimelogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      width: 100,
      cellWidth: 0
    };

    this.getStyle = this.getStyle.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }
  componentDidMount() {
    const parentNode = this.textInput.parentNode;
    const cellWidth = parentNode.offsetWidth / 96;

    interact(this.textInput).draggable({
      onmove: this.onMove,
      snap: {
        targets: [
          interact.createSnapGrid({ x: cellWidth })
        ],
        range: Infinity
      },
      restrict: {
        restriction: parentNode,
        elementRect: { left: 0, right: 1, top: 0, bottom: 0 }
      },
      axis: 'x'
    }).resizable({
      edges: { right: true }
    }).on('resizemove', this.onDrag);
  }
  onMove(e) {
    let posX = this.state.x + e.dx;

    if (posX < 0) {
      posX = 0;
    }

    this.setState({
      x: posX
    });
  }
  onDrag(e) {
    const parentNode = this.textInput.parentNode;
    const cellWidth = parentNode.offsetWidth / 96;

    const width = e.rect.width;

    if (width % cellWidth > 5) {
      this.setState({
        width: Math.round(width / cellWidth) * 12
      });
    }
  }
  getStyle() {
    return {
      transform: `translate(${this.state.x}px)`,
      width: `${this.state.width}px`
    };
  }
  render() {
    return (
      <div className="timelogs">
        <h1>Time logs</h1>
        <table>
          <tbody>
            <tr className="time">
              <td>Time: </td>
              <td>00:00</td>
              <td>01:00</td>
              <td>02:00</td>
              <td>03:00</td>
              <td>04:00</td>
              <td>05:00</td>
              <td>06:00</td>
              <td>07:00</td>
              <td>08:00</td>
              <td>09:00</td>
              <td>10:00</td>
              <td>11:00</td>
              <td>12:00</td>
              <td>13:00</td>
              <td>14:00</td>
              <td>15:00</td>
              <td>16:00</td>
              <td>17:00</td>
              <td>18:00</td>
              <td>19:00</td>
              <td>20:00</td>
              <td>21:00</td>
              <td>22:00</td>
              <td>23:00</td>
            </tr>
            <tr >
              <td>Task #1</td>
              <td colSpan="24">
                <div className="timelogs-track">
                  <div
                    className="timelogs-time"
                    ref={(input) => { this.textInput = input; }}
                    style={this.getStyle()}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Ttimelogs.propTypes = {
  name: React.PropTypes.string
};
