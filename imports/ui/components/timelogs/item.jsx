import React from 'react';
import moment from 'moment';
import interact from 'interact.js';

export default class LogsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggablePosX: 0,
      draggablePosDx: 0,
      sliderWidth: 0
    };

    this.updateStyle = this.updateStyle.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  componentDidMount() {
    const track = this.slider.parentNode;
    const draggableOptions = {
      restrict: {
        restriction: track,
        elementRect: { left: 0, right: 1 }
      },
      axis: 'x'
    };
    const resizableOptions = {
      edges: { right: true }
    };

    interact(this.slider)
      .draggable(draggableOptions)
      .resizable(resizableOptions)
      .on('resizemove', this.onResize)
      .on('dragmove', this.onDrag);

    this.updateStyle();
  }
  componentWillReceiveProps() {
    this.updateStyle();
  }
  onDrag(e) {
    const parentNode = this.textInput.parentNode;
    const cellWidth = parentNode.offsetWidth / 96;

    const draggablePosDx = this.state.draggablePosDx + e.dx;
    const draggablePosX = Math.floor(draggablePosDx / cellWidth) * cellWidth;

    this.setState({
      draggablePosX,
      draggablePosDx
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
      MsTransform: `translate(${this.state.draggablePosX}px)`,
      WebkitTransform: `translate(${this.state.draggablePosX}px)`,
      transform: `translate(${this.state.draggablePosX}px)`,
      width: `${this.state.sliderWidth}px`
    };
  }
  updateStyle() {
    const { trackWidth, slider } = this.props;

    const trackPartWidth = trackWidth / 96;

    const diff = moment(new Date(slider.endAt)).diff(moment(new Date(slider.startAt)));
    const minutes = moment.duration(diff).asMinutes();

    this.setState({
      sliderWidth: Math.round(minutes / 15) * trackPartWidth
    });
  }
  render() {
    return (
      <div className="timelogs-track">
        <div className="timelogs-slider" ref={(slider) => { this.slider = slider; }} style={this.getStyle()} />
      </div>
    );
  }
}

LogsItem.propTypes = {
  trackWidth: React.PropTypes.number,
  slider: React.PropTypes.object
};
