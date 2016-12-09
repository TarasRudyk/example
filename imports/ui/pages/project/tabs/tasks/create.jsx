import React from 'react';

import { createTask } from '/imports/api/tasks/actions.js';

import TaskForm from './task-form';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleSubmitForm(task) {
    createTask(task, this.props.project._id);
  }
  render() {
    return (
      <div className="app-content app-create-project">
        <div className="container">
          <div className="title">
            <h1>Create task</h1>
          </div>
          <TaskForm submitLable="Create task" project={this.props.project} onSubmit={this.handleSubmitForm} />
        </div>
      </div>
    );
  }
}

CreateTask.propTypes = {
  project: React.PropTypes.object
};
