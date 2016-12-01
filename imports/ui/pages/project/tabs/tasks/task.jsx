import React from 'react';
import { Meteor } from 'meteor/meteor';
import AcceptTask from '/imports/ui/containers/pages/project/tabs/tasks/accept-task';
import ReassignTask from '/imports/ui/containers/pages/project/tabs/tasks/reassign-task';
import { deleteTask, reassignTask } from '/imports/api/tasks/actions';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReassignModalOpen: false,
      isAcceptModalOpen: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleReassign = this.handleReassign.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReassignSubmit = this.handleReassignSubmit.bind(this);
    this.handleReassignClose = this.handleReassignClose.bind(this);
    this.handleAcceptClose = this.handleAcceptClose.bind(this);
    this.canEdit = this.canEdit.bind(this);
  }
  canEdit() {
    return (Meteor.userId() === this.props.task.ownerId) ||
      (Meteor.userId() === this.props.task.assignedAt);
  }
  handleDelete() {
    const conf = confirm('Delete this task?'); // eslint-disable-line 
    if (conf) {
      deleteTask(this.props.task._id);
    }
  }
  handleReassign() {
    this.setState({
      isReassignModalOpen: true
    });
  }
  handleAccept() {
    this.setState({
      isAcceptModalOpen: true
    });
  }
  handleReassignSubmit({ assignedAt, description }) {
    if (this.props.task.assignedAt !== assignedAt) {
      reassignTask(this.props.task._id, description, assignedAt);
    }
  }
  handleReassignClose() {
    this.setState({
      isReassignModalOpen: false
    });
  }
  handleAcceptClose() {
    this.setState({
      isAcceptModalOpen: false
    });
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
          {this.canEdit() ? <button onClick={this.handleDelete}>Delete</button> : ''}
          {this.canEdit() ? <button onClick={this.handleReassign}>Reassign</button> : ''}
          {this.canEdit() ? <button onClick={this.handleAccept}>Accept</button> : ''}
        </div>
        <ReassignTask
          task={this.props.task}
          isOpen={this.state.isReassignModalOpen}
          onSubmit={this.handleReassignSubmit}
          onClose={this.handleReassignClose}
        />
        <AcceptTask
          task={this.props.task}
          isOpen={this.state.isAcceptModalOpen}
          onClose={this.handleAcceptClose}
        />
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object
};
