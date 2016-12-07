import React from 'react';
import moment from 'moment';
import TimeLogsCalendar from '/imports/ui/containers/pages/project/tabs/tasks/time-logs-calendar';

export default class TaskTimelogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNewTimeLog: false
    };

    this.addTimeLog = this.addTimeLog.bind(this);
  }

  addTimeLog() {
    this.setState({
      addingNewTimeLog: true
    });
  }

  render() {
    return (
      <div className="task-timelogs">
        {this.state.addingNewTimeLog ?
          <div>Adding new time log
          <TimeLogsCalendar />
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
