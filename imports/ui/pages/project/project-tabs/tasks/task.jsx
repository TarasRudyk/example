import React from 'react';
import { Meteor } from 'meteor/meteor';

import { deleteTask } from '/imports/api/tasks/actions';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.delete = this.delete.bind(this);
  }
  isThisUserOwner() {
    return Meteor.userId() === this.props.task.ownerId;
  }
  delete() {
    deleteTask(this.props.task._id);
  }
  render() {
    const { name, description, startAt, assignedAt } = this.props.task;
    return (
      <div className="page-main-content page-create-project">
        <div className="container">
          <div className="title">
            <h1>Task</h1>
          </div>
          <p>name: {name}</p>
          <p>description: {description}</p>
          <p>Start at: {startAt ? startAt.toString() : ''}</p>
          <p>Assigned at: {assignedAt}</p>
          {this.isThisUserOwner() ? <button onClick={this.delete}>Delete</button> : ''}
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object
};
