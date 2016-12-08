/* global window */

import React from 'react';

import LogsItem from '/imports/ui/components/timelogs/item';

export default class Timelogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = { trackWidth: 0 };

    this.getTrackWidth = this.getTrackWidth.bind(this);
    this.renderTimelogsTrack = this.renderTimelogsTrack.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.getTrackWidth);
  }
  componentDidMount() {
    this.getTrackWidth();
  }
  componentWillUnmount() {
    window.addEventListener('resize', this.getTrackWidth);
  }
  getTrackWidth() {
    const trackWidth = this.timelogs.offsetWidth;

    this.setState({ trackWidth });
  }
  renderTimelogsTrack() {
    if (!this.state.trackWidth) {
      return null;
    }

    return this.props.timelogs.map(t => (
      <LogsItem key={t.id} trackWidth={this.state.trackWidth} slider={t} />
    ));
  }
  render() {
    return (
      <div className="timelogs" ref={(timelogs) => { this.timelogs = timelogs; }}>
        <div className="timelogs-header">
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
        <div className="timelogs-content">
          {this.renderTimelogsTrack()}
        </div>
      </div>
    );
  }
}

Timelogs.propTypes = {
  timelogs: React.PropTypes.array
};
