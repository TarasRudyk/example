import React from 'react';
import moment from 'moment';

export default class TaskTimelogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  addTimeLog() {
  }

  render() {
    return (
      <div className="task-timelogs">
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
    );
  }
}

TaskTimelogs.propTypes = {
  timeLogs: React.PropTypes.array
};
