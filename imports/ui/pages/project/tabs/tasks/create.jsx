import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import formatValidation from 'string-format-validation';
import { TAPi18n } from 'meteor/tap:i18n';

import AssignUser from '/imports/ui/components/assign-user/main';

import { createTask } from '/imports/api/tasks/actions.js';

export default class CreateTask extends React.Component {
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
      assignedAt: '',
      startAt: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOnAssigned = this.handleOnAssigned.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

      createTask({
        name: name.value,
        description: description.value,
        assignedAt,
        startAt: startAt.toDate ? startAt.toDate() : null
      }, this.props.project._id);
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
      <div className="page-main-content page-create-project">
        <div className="container">
          <div className="title">
            <h1>Create task</h1>
          </div>
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
              selected={this.state.startAt}
              onChange={this.handleDateChange}
              placeholderText="Start task at"
              minDate={moment()}
            />
            <AssignUser project={this.props.project} onAssigned={this.handleOnAssigned} />
            <input
              type="submit"
              value="Create"
              className="button green"
            />
          </form>
        </div>
      </div>
    );
  }
}

CreateTask.propTypes = {
  project: React.PropTypes.object
};
