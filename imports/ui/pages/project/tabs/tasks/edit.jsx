import React from 'react';

import { editTask } from '/imports/api/tasks/actions.js';

import TaskForm from './task-form';

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleSubmitForm(task) {
    editTask(Object.assign(task, { taskId: this.props.task._id }));
  }
  render() {
    return (
      <div className="page-main-content page-edit-project">
        <div className="container">
          <div className="title">
            <h1>Edit task</h1>
          </div>
          <TaskForm submitLable="Edit task" task={this.props.task} project={this.props.project} onSubmit={this.handleSubmitForm} />
        </div>
      </div>
    );
  }
}

EditTask.propTypes = {
  project: React.PropTypes.object,
  task: React.PropTypes.object
};
