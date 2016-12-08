import React from 'react';
import moment from 'moment';
import interact from 'interact.js';

export default class LogsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggablePosX: 0,
      draggablePosDx: 0,
      sliderWidth: 0,
      trackWidth: this.props.trackWidth,
      slider: this.props.slider
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
  componentWillReceiveProps(nextProps) {
    const { trackWidth, slider } = nextProps;

    this.setState({
      trackWidth,
      slider
    });

    this.updateStyle();
  }
  onDrag(e) {
    const { trackWidth } = this.props;

    const trackPartWidth = trackWidth / 96;

    const draggablePosDx = this.state.draggablePosDx + e.dx;
    const draggablePosX = Math.floor(draggablePosDx / trackPartWidth) * trackPartWidth;

    this.setState({
      draggablePosX,
      draggablePosDx
    });
  }
  onResize(e) {
    const { trackWidth } = this.props;

    const trackPartWidth = trackWidth / 96;

    const width = e.rect.width;
    const result = Math.floor(width / trackPartWidth) * trackPartWidth;

    if (result !== this.state.width) {
      this.setState({
        sliderWidth: result
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
    const { trackWidth, slider } = this.state;

    const trackPartWidth = trackWidth / 96;

    const diff = moment(new Date(slider.endAt)).diff(new Date(slider.startAt));
    const minutes = moment.duration(diff).asMinutes();

    const day = moment(new Date(slider.startAt)).startOf('day');
    const afterStartDay = moment(new Date(slider.startAt)).diff(day);
    const minutesAfterStartDay = moment.duration(afterStartDay).asMinutes();

    this.setState({
      draggablePosX: Math.round(minutesAfterStartDay / 15) * trackPartWidth,
      draggablePosDx: Math.round(minutesAfterStartDay / 15) * trackPartWidth,
      sliderWidth: Math.round(minutes / 15) * trackPartWidth
    });
  }
  render() {
    return (
      <div className="timelogs-track-wrapper">
        <div className="timelogs-info">
          <div className="timelogs-task-name">Task #{this.props.slider.id}</div>
          <div className="timelogs-time-info">
            <div className="timelogs-time-start-at">Start at: 10:00</div>
            <div className="timelogs-time-duration">Duration: 2h 15m</div>
          </div>
        </div>
        <div className="timelogs-track">
          <div className="timelogs-slider" ref={(slider) => { this.slider = slider; }} style={this.getStyle()} />
        </div>
      </div>
    );
  }
}

LogsItem.propTypes = {
  trackWidth: React.PropTypes.number,
  slider: React.PropTypes.object
};
