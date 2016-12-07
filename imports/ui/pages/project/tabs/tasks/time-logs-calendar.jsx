import React from 'react';
import moment from 'moment';

export default class TimeLogsCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      startOfWeek: moment().startOf('isoweek')
    };
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
  }
  nextWeek() {
    const startOfWeek = moment(this.state.startOfWeek).add(1, 'weeks');
    this.setState({
      startOfWeek: startOfWeek
    });
  }
  previousWeek() {
    const startOfWeek = moment(this.state.startOfWeek).subtract(1, 'weeks');
    this.setState({
      startOfWeek: startOfWeek
    });
  }
  dateIsSelected(isSelected) {
    return isSelected ? 'dashboard-calendar-day date-is-selected' : 'dashboard-calendar-day';
  }

  render() {
    return (
      <div className="dashboard-calendar">
        <div className="container">
          <div className="title">
            <div className="title-right-block">
              <div className="dashboard-calendar">
                <button type="button" onClick={this.props.goPreviousWeek}>&#171;</button>
                {this.props.days.map((d, i) => (
                  <div key={i} className={`${this.dateIsSelected(d.isSelected)}`}>
                    <a href="" onClick={this.props.choseDay} data-date={d.date}>
                      <div className="">
                        <p>{moment(d.date).format('DD-MM-YYYY')}</p>
                        <p>Tasks: {d.tasksCount || 0}</p>
                        <p>Estimate: {d.estimate.hh} hh, {d.estimate.mm} mm</p>
                      </div>
                    </a>
                  </div>
                ))}
                <button type="button" onClick={this.props.goNextWeek}> &#187; </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TimeLogsCalendar.propTypes = {
  days: React.PropTypes.array,
  choseDay: React.PropTypes.func,
  goPreviousWeek: React.PropTypes.func,
  goNextWeek: React.PropTypes.func
};
