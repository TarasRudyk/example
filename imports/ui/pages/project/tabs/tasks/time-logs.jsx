import React from 'react';
import moment from 'moment';
import TimeLogsCalendar from '/imports/ui/containers/pages/project/tabs/tasks/time-logs-calendar';
import Timelogs from '/imports/ui/containers/pages/project/tabs/tasks/day-time-logs';

export default class TaskTimelogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNewTimeLog: false,
      chosenDay: moment().startOf('day'),
      startOfWeek: moment().startOf('isoweek')
    };

    this.addTimeLog = this.addTimeLog.bind(this);
    this.cancelAddingNewTimeLog = this.cancelAddingNewTimeLog.bind(this);
    this.handleChoseDay = this.handleChoseDay.bind(this);
    this.handleClickNextWeek = this.handleClickNextWeek.bind(this);
    this.handleClickPreviousWeek = this.handleClickPreviousWeek.bind(this);
  }

  addTimeLog() {
    this.setState({
      addingNewTimeLog: true
    });
  }

  cancelAddingNewTimeLog() {
    this.setState({
      addingNewTimeLog: false
    });
  }

  handleChoseDay({ currentTarget }) {
    const selectedDate = new Date(currentTarget.dataset.date);
    this.setState({ chosenDay: selectedDate });
  }

  handleClickNextWeek() {
    const startOfWeek = moment(this.state.startOfWeek).add(1, 'weeks');
    this.setState({
      startOfWeek: startOfWeek
    });
  }

  handleClickPreviousWeek() {
    const startOfWeek = moment(this.state.startOfWeek).subtract(1, 'weeks');
    this.setState({
      startOfWeek: startOfWeek
    });
  }

  render() {
    return (
      <div className="task-timelogs">
        <TimeLogsCalendar
          choseDay={this.handleChoseDay}
          chosenDay={this.state.chosenDay}
          goNextWeek={this.handleClickNextWeek}
          goPreviousWeek={this.handleClickPreviousWeek}
          startOfWeek={this.state.startOfWeek}
        />
        <Timelogs
          taskId={this.props.taskId}
          projectId={this.props.projectId}
          chosenDay={this.state.chosenDay}
        />
      </div>
    );
  }
}

TaskTimelogs.propTypes = {
  taskId: React.PropTypes.string,
  projectId: React.PropTypes.string
};
