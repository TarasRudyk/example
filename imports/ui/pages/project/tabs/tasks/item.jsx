import React from 'react';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { _id, name, ownerName, projectId } = this.props.task;

    return (
      <div className="list-item">
        <div className="project-item">
          <div className="project-item-information">
            <div className="project-item-title"><a href={`/project/${projectId}/task/${_id}`}>{name}</a></div>
            <div className="project-item-subtitle">Owner: <a href="/">{ownerName}</a></div>
          </div>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  task: React.PropTypes.object
};
