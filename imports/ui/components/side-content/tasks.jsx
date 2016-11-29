import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import { Meteor } from 'meteor/meteor';
import TaskItem from './items/task';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProj: '',
      isAssigned: false
    };

    this.getTasks = this.getTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }
  getTasks() {
    const { selectedProj, isAssigned } = this.state;
    if (this.props.tasks.length > 0) {
      return (
        <div className="list">
          {
            this.props.tasks.filter((t) => {
              if (selectedProj && isAssigned) {
                return t.projectId === selectedProj && t.assignedAt === Meteor.userId();
              }
              if (!selectedProj && isAssigned) {
                return t.assignedAt === Meteor.userId();
              }
              if (selectedProj && !isAssigned) {
                return t.projectId === selectedProj;
              }
              return t;
            }).map(t => (
              <Draggable key={t._id} type="_id" data={t._id}>
                <TaskItem key={t._id} task={t} filter={selectedProj} isAssigned={isAssigned} />
              </Draggable>
            ))
          }
        </div>
      );
    }

    return null;
  }
  handleChange(e) {
    this.setState({
      selectedProj: e.target.value
    });
  }
  toggleCheckbox(e) {
    this.setState({
      isAssigned: e.target.checked
    });
  }
  render() {
    const { userProjects } = this.props;
    return (
      <div className="page-side-content-wrapper">
        <div className="page-side-content-inner">
          <div className="page-side-content-panel">
            <div className="page-side-content-panel-inner">
              <div className="page-side-content-lists">
                <select onChange={this.handleChange}>
                  <option value="" default>All projects</option>
                  {
                    userProjects.map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>)
                  }
                </select>
                <input
                  type="checkbox"
                  id="toggleCheckbox"
                  onChange={this.toggleCheckbox}
                  checked={this.state.isAssigned}
                />
                <label htmlFor="toggleCheckbox">Assigned tasks</label>
                {this.getTasks()}
                {!this.props.tasks.length ? (
                  <div className="no-notifications">
                    <div className="container">
                      No tasks yet
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  tasks: React.PropTypes.arrayOf(React.PropTypes.object),
  userProjects: React.PropTypes.arrayOf(React.PropTypes.object)
};
