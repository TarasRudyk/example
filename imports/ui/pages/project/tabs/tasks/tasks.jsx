import React from 'react';
import TaskItem from '/imports/ui/containers/pages/project/tabs/tasks/item';

export default class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { projectId, isProjectOwner } = this.props;

    return (
      <div className="project-tasks">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h3>All tasks</h3>
              {isProjectOwner ?
                <div className="title-right-block">
                  <a href={`/project/${projectId}/task/create`} className="button green small">New task</a>
                </div> : null}
            </div>
          </div>
        </div>
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
