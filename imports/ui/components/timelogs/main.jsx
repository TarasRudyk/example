/* global window */

import React from 'react';

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
    this.renderTimelogsTrack = this.renderTimelogsTrack.bind(this);
    this.addTimeLog = this.addTimeLog.bind(this);
    this.cancelAddingNewTimeLog = this.cancelAddingNewTimeLog.bind(this);
    this.updateTimelogs = this.updateTimelogs.bind(this);
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
  cancelAddingNewTimeLog() {
    this.setState({
      addingNewTimeLog: false
    });
  }
  addTimeLog() {
    const defaultLog = {
      _id: new Date().getTime().toString(),
      startAt: moment().add(1, 'hours').toDate(),
      endAt: moment().add(2, 'hours').toDate()
    };
    const timeLogs = this.state.timelogs;
    timeLogs.push(defaultLog);
    this.setState({
      addingNewTimeLog: true,
      timelogs: timeLogs
    });
  }

  updateTimelogs(newLog) {
    const oldLogs = this.state.timelogs;
    let index = -1;
    for (let i = 0, len = oldLogs.length; i < len; i += 1) {
      if (oldLogs[i]._id === newLog.id) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      oldLogs.splice(index, 1);
      oldLogs.push({
        _id: newLog.id,
        startAt: moment(newLog.startAt).toDate(),
        endAt: moment(newLog.endAt).toDate()
      });
      this.setState({
        timelogs: oldLogs
      });
    }
  }


  renderTimelogsTrack() {
    if (!this.state.trackWidth) {
      return null;
    }

    return this.state.timelogs.map(t => (
      <LogsItem
        key={t._id}
        trackWidth={this.state.trackWidth}
        slider={t} id={t._id}
        callback={this.updateTimelogs}
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
          {this.renderTimelogsTrack()}
        </div>
        <button type="button" onClick={this.addTimeLog}>Add</button>
        <button type="button" onClick={this.cancelAddingNewTimeLog}>Cancel</button>
      </div>
    );
  }
}

Timelogs.propTypes = {
  timelogs: React.PropTypes.array
};
