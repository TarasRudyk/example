/* global window */

import React from 'react';
import update from 'react-addons-update';
import _ from 'lodash';
import LogsItem from '/imports/ui/components/timelogs/item';

import moment from 'moment';

export default class Timelogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackWidth: 0,
      timelogs: props.timelogs
    };

    this.getTrackWidth = this.getTrackWidth.bind(this);
    this.renderTimelogs = this.renderTimelogs.bind(this);
    this.addTimelog = this.addTimelog.bind(this);
    this.updateTimelog = this.updateTimelog.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.getTrackWidth);
  }
  componentDidMount() {
    this.getTrackWidth();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.timelogs !== this.state.timelogs) {
      this.setState({
        timelogs: nextProps.timelogs
      });
    }
  }
  componentWillUnmount() {
    window.addEventListener('resize', this.getTrackWidth);
  }
  getTrackWidth() {
    const trackWidth = this.timelogs.offsetWidth;

    this.setState({ trackWidth });
  }
  addTimelog() {
    const defaultLog = {
      _id: new Date().getTime().toString(),
      startAt: moment(new Date()).startOf('day'),
      endAt: moment(new Date()).startOf('day').add(1, 'hours').toDate()
    };

    this.setState({
      timelogs: update(this.state.timelogs, { $push: [defaultLog] })
    });
  }
  updateTimelog(log) {
    const index = _.findIndex(this.state.timelogs, l => l._id === log._id);

    this.setState({
      timelogs: update(this.state.timelogs, { [index]: {
        $merge: { startAt: log.startAt, endAt: log.endAt }
      } })
    });
  }
  renderTimelogs() {
    if (!this.state.trackWidth) {
      return null;
    }

    return this.state.timelogs.map(t => (
      <LogsItem
        key={t._id}
        slider={t}
        trackWidth={this.state.trackWidth}
        callback={this.updateTimelog}
      />
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
          {this.renderTimelogs()}
        </div>
        <button type="button" onClick={this.addTimelog}>Add</button>
        <button type="button" onClick={this.cancelAddingNewTimeLog}>Save</button>
      </div>
    );
  }
}

Timelogs.propTypes = {
  timelogs: React.PropTypes.array
};
