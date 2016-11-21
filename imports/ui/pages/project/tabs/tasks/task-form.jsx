import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import formatValidation from 'string-format-validation';
import { TAPi18n } from 'meteor/tap:i18n';

import AssignUser from '/imports/ui/containers/components/assign-user';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: '',
        error: ''
      },
      description: {
        value: ''
      },
      taskId: '',
      assignedAt: '',
      startAt: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOnAssigned = this.handleOnAssigned.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const task = nextProps.task;
    if (task && this.state.taskId !== task._id) {
      this.setState({
        name: {
          value: task.name,
          error: ''
        },
        description: {
          value: task.description || ''
        },
        assignedAt: task.assignedAt || '',
        startAt: task.startAt ? moment(task.startAt) : null,
        taskId: task._id
      });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const taskName = this.state.name.value.trim();

    let errors = false;

    if (!formatValidation.validate({ min: 3, max: 25 }, taskName)) {
      this.setState({
        name: {
          value: taskName,
          error: TAPi18n.__('commonValidation.nameIncorect')
        }
      });

      errors = true;
    }

    if (!errors) {
      const { name, description, assignedAt, startAt } = this.state;
      const startAtDate = startAt && startAt.toDate();
      const task = {
        name: name.value,
        description: description.value,
        assignedAt,
        startAt: startAtDate
      };

      this.props.onSubmit(task);
    }
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: {
        value: target.value,
        error: ''
      }
    });
  }
  handleDateChange(date) {
    if (date.isBefore(moment(), 'day')) return;
    const validDate = date.isValid() ? date : null;
    this.datePicker.cancelFocusInput();
    this.setState({
      startAt: validDate
    });
  }
  handleOnAssigned(user) {
    const id = user ? user._id : '';
    this.setState({
      assignedAt: id
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          autoFocus
          className={this.state.name.error ? 'error' : ''}
          value={this.state.name.value}
          onChange={this.handleChange}
        />
        <span className="field-error">{this.state.name.error}</span>
        <textarea
          name="description"
          placeholder="Description"
          value={this.state.description.value}
          onChange={this.handleChange}
        />
        <DatePicker
          ref={(dp) => { this.datePicker = dp; }}
          selected={this.state.startAt}
          onChange={this.handleDateChange}
          placeholderText="Start task at"
          minDate={moment()}
        />
        <AssignUser
          project={this.props.project}
          onAssigned={this.handleOnAssigned}
          assignedUserId={this.state.assignedAt}
        />
        <input
          type="submit"
          value={this.props.submitLable}
          className="button green"
        />
      </form>
    );
  }
}

TaskForm.propTypes = {
  project: React.PropTypes.object,
  task: React.PropTypes.object, // eslint-disable-line 
  submitLable: React.PropTypes.string,
  onSubmit: React.PropTypes.func
};
