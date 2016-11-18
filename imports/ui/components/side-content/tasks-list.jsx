import React from 'react';

import TaskItem from './items/task';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getTasks = this.getTasks.bind(this);
  }
  getTasks() {
    if (this.props.tasks.length > 0) {
      return (
        <div className="list">
          {
            this.props.tasks.map(t => (
              <TaskItem key={t._id} task={t} />
            ))
          }
        </div>
      );
    }

    return null;
  }
  render() {
    return (
      <div className="page-side-content-wrapper">
        <div className="page-side-content-inner">
          <div className="page-side-content-panel">
            <div className="page-side-content-panel-inner">
              <div className="page-side-content-lists">
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
  tasks: React.PropTypes.arrayOf(React.PropTypes.object)
};
