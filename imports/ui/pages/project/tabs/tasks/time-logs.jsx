import React from 'react';
import moment from 'moment';
import TimeLogsCalendar from '/imports/ui/containers/pages/project/tabs/tasks/time-logs-calendar';

export default class TaskTimelogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNewTimeLog: false,
      chosenDay: moment().startOf('day')
    };

    this.addTimeLog = this.addTimeLog.bind(this);
    this.handleChoseDay = this.handleChoseDay.bind(this);
    this.handleClickNextWeek = this.handleClickNextWeek.bind(this);
    this.handleClickPreviousWeek = this.handleClickPreviousWeek.bind(this);
  }

  addTimeLog() {
    this.setState({
      addingNewTimeLog: true
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
        {this.state.addingNewTimeLog ?
          <div>Adding new time log
          <TimeLogsCalendar
            choseDay={this.handleChoseDay}
            chosenDay={this.state.chosenDay}
            goNextWeek={this.handleClickNextWeek}
            goPreviousWeek={this.handleClickPreviousWeek}
            startOfWeek={this.state.startOfWeek}
          />
          </div> :
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Start at:</th>
                  <th>Finish at:</th>
                </tr>
                {this.props.timeLogs.map((t, i) => (
                  <tr key={i}>
                    <td>{moment(t.startAt).format('DD/MM/YYYY: hh:mm:ss')}</td>
                    <td>{moment(t.finishAt).format('DD/MM/YYYY: hh:mm:ss')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={this.addTimeLog}>Add</button>
          </div>
        }
      </div>
    );
  }
}

TaskTimelogs.propTypes = {
  timeLogs: React.PropTypes.array
};
