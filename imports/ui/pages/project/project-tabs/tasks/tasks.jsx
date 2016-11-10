import React from 'react';
import TaskItem from './item';

export default class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { projectId, isProjectOwner } = this.props;

    return (
      <div>
        <h1>Tasks</h1>
        { isProjectOwner ?
          <a href={`/project/${projectId}/task/create`} className="button green">New task</a>
        : null }
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
  tasks: React.PropTypes.array,
  isProjectOwner: React.PropTypes.bool
};
