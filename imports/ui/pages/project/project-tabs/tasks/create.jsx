import React from 'react';
import Datetime from 'react-datetime';

import AssignUser from '/imports/ui/components/assign-user/main';

import { createTask } from '/imports/api/tasks/actions.js';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      assignedAt: '',
      startAt: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnAssigned = this.handleOnAssigned.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const name = this.state.name.trim();
    const description = this.state.description.trim();

    createTask(name, description, this.props.project._id);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  handleOnAssigned(user) {
    const id = user ? user._id : '';
    this.setState({
      assignedAt: id
    });
  }
  isValidDate(current) {
    const yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
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
              value={this.state.email}
              onChange={this.handleChange}
              onCopy={this.handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={this.state.password}
              onChange={this.handleChange}
              onCopy={this.handleChange}
            />
            <Datetime isValidDate={this.isValidDate} />
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
  // projectOwnerId: React.PropTypes.string
};
