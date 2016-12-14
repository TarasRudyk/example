/* global window */

import React from 'react';
import update from 'react-addons-update';
import _ from 'lodash';
import LogsItem from '/imports/ui/components/timelogs/item';
import { createLog, editLog, removeLog } from '/imports/api/time-logs/actions';
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
    this.removeTimelog = this.removeTimelog.bind(this);
    this.saveTimelogs = this.saveTimelogs.bind(this);
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
      startAt: moment(this.props.chosenDay).startOf('day').toDate(),
      endAt: moment(this.props.chosenDay).startOf('day').add(1, 'hours').toDate(),
      status: 'new'
    };

    this.setState({
      timelogs: update(this.state.timelogs, { $push: [defaultLog] })
    });
  }
  updateTimelog(log) {
    const index = _.findIndex(this.state.timelogs, l => l._id === log._id);

    const status = this.state.timelogs[index].status === 'new' ? 'new' : 'update';

    const updatedLogs = update(this.state.timelogs, { [index]: {
      $merge: { startAt: log.startAt, endAt: log.endAt, status }
    } });

    // if (this.state.timelogs[index]._id.substring(0, 6) === 'tempId') {
    //   createLog(this.props.projectId, this.props.taskId, log.startAt, new Date(log.endAt));
    // } else {
    //   editLog(log._id, log.startAt, new Date(log.endAt));
    // }
    this.setState({
      timelogs: updatedLogs
    });
  }
  removeTimelog({ currentTarget }) {
    const index = _.findIndex(this.state.timelogs, l => l._id === currentTarget.dataset.id);
    const log = this.state.timelogs[index];

    if (log.status && log.status === 'new') {
      // TODO: use immutable update
      const logs = this.state.timelogs;
      logs.splice(index, 1);

      this.setState({
        timelogs: logs
      });
    } else {
      removeLog(currentTarget.dataset.id);
    }
  }
  saveTimelogs() {
    this.state.timelogs.map((t) => {
      if (t.status) {
        if (t.status === 'new') {
          return createLog(this.props.projectId, this.props.taskId, t.startAt, new Date(t.endAt));
        }
        if (t.status === 'update') {
          return editLog(t._id, t.startAt, new Date(t.endAt));
        }
      }
      return true;
    });
  }
  renderTimelogs() {
    if (!this.state.trackWidth) {
      return null;
    }

    return this.state.timelogs.map(t => (
      <div key={t._id} className="log-content">
        <LogsItem
          slider={t}
          trackWidth={this.state.trackWidth}
          callback={this.updateTimelog}
        />
        <button type="button" onClick={this.removeTimelog} className="remove-log" data-id={t._id} title="remove log">x</button>
      </div>
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
        <button type="button" onClick={this.addTimelog} className="add-log" title="add new log">+</button>
        <button type="button" onClick={this.saveTimelogs}>Save</button>
      </div>
    );
  }
}

Timelogs.propTypes = {
  timelogs: React.PropTypes.array,
  projectId: React.PropTypes.string,
  taskId: React.PropTypes.string,
  chosenDay: React.PropTypes.object
};
