import React from 'react';
import moment from 'moment';
import 'moment-range';

export default class DashboardCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      startOfWeek: moment().startOf('isoweek')
    };
  }

  render() {
    return (
      <div className="dashboard-calendar">
        <div className="container">
          <div className="title">
            <div className="title-right-block">
              <span>this is dashboard calendar</span>
              <button type="button" onClick={this.previousWeek}>&#171;</button>
              {this.props.days.map((d, i) => (
                <a href="" key={i} onClick={this.props.click} data-date={d}>
                  <div className="">
                    <span>{d.day}</span>
                    <span>{d.estimate}</span>
                  </div>
                </a>
              ))}
              <button type="button" onClick={this.nextWeek}> &#187; </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DashboardCalendar.propTypes = {
  days: React.PropTypes.array,
  click: React.PropTypes.func
};
