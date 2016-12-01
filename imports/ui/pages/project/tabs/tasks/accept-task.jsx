import React from 'react';
import Modal from 'react-modal';
import { TAPi18n } from 'meteor/tap:i18n';
import { acceptTask } from '/imports/api/tasks/actions';
import moment from 'moment';
import 'moment-range';

export default class AcceptTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      assignedAt: '',
      isOpen: false,
      startAt: new Date(),
      startOfWeek: moment().startOf('isoweek'),
      estimate: {
        value: 15,
        error: ''
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.weekDates = this.weekDates.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.dateIsSelected = this.dateIsSelected.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);

    this.modalStyles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      content: {
        top: 105,
        left: 0,
        right: 0,
        bottom: 'initial',
        margin: 'auto',
        width: '386px',
        backgroundColor: '#f8f8f8'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const task = nextProps.task;
    if (task && this.state.taskId !== task._id) {
      this.setState({
        assignedAt: task.assignedAt || ''
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.acceptEstimate();
  }

  weekDates() {
    const startOfWeek = this.state.startOfWeek;
    const endOfWeek = moment(startOfWeek).add(6, 'days').endOf('day');
    const dates = moment.range(startOfWeek, endOfWeek).toArray('days');
    return dates;
  }

  handleClose() {
    this.props.onClose();
    this.setState({
      description: '',
      assignedAt: '',
      estimate: {
        value: 15,
        error: ''
      },
      startAt: new Date(),
      startOfWeek: moment().startOf('isoweek')
    });
  }

  acceptEstimate() {
    if (this.state.estimate.value < 15) {
      this.setState({
        estimate: {
          value: this.state.estimate.value,
          error: TAPi18n.__('change.incorrectEstimate')
        }
      });
    } else {
      acceptTask(this.props.task._id, parseInt(this.state.estimate.value, 10), this.state.startAt);
      this.handleClose();
      this.setState({
        isOpen: false,
        estimate: {
          value: 15,
          error: ''
        },
        startAt: new Date(),
        startOfWeek: moment().startOf('isoweek')
      });
    }
  }
  selectDate({ currentTarget }) {
    const selectedDate = moment(parseInt(currentTarget.dataset.date, 10)).toDate();
    this.setState({
      startAt: selectedDate
    });
  }
  dateIsSelected(date) {
    return date.format('DD-MM-YYYY') === moment(this.state.startAt).format('DD-MM-YYYY') ?
      'day-of-week date-is-selected' : 'day-of-week';
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
  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: {
          value: target.value,
          error: ''
        }
      });
    }
  }

  render() {
    return (
      <div className="">
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.handleClose}
          style={this.modalStyles}
        >
          <div className="accept-modal-content">
            <form onSubmit={this.handleFormSubmit}>
              <h1>Please, estimate this task</h1>
              <input
                className={this.state.estimate.error ? 'error' : ''}
                type="number"
                name="estimate"
                step="15"
                placeholder={this.state.estimate.value}
                value={this.state.estimate.value}
                onChange={this.handleChange}
              />
              <div className="week-with-tasks">
                <button type="button" onClick={this.previousWeek}>&#171;</button>
                {this.weekDates().map((d, i) => (
                  <a href="" key={i} onClick={this.selectDate} data-date={d}>
                    <div className={`${this.dateIsSelected(d)}`}>
                      <span>{moment(d).format('dd')}</span>
                      <span>{moment(d).format('DD/MM')}</span>
                    </div>
                  </a>
                ))}
                <button type="button" onClick={this.nextWeek}> &#187; </button>
              </div>
              <button type="button" onClick={this.handleClose}>Cancel</button>
              <button>Accept</button>
              <span className="field-error">{this.state.estimate.error}</span>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

AcceptTask.propTypes = {
  task: React.PropTypes.object,
  isOpen: React.PropTypes.bool,
  onClose: React.PropTypes.func
};
