import React from 'react';
import TaskItem from './item';

export default class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { projectId } = this.props;

    return (
      <div>
        <h1>Tasks</h1>
        <a href={`/project/${projectId}/task/create`} className="button green">New task</a>
        <div className="list">
          <div className="container">
            {this.props.tasks.map((t, i) => (
              <TaskItem
                key={i}
                task={t}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Tasks.propTypes = {
  projectId: React.PropTypes.string,
  tasks: React.PropTypes.array
  // projectOwnerId: React.PropTypes.string
};
