import React from 'react';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { _id, name, ownerName, projectId } = this.props.task;
    let fullname;
    if (this.props.assignedAt.profile) {
      fullname = this.props.assignedAt.profile.fullname;
    }

    return (
      <div className="list-item">
        <div className="project-item">
          <div className="project-item-information">
            <div className="project-item-title"><a href={`/project/${projectId}/task/${_id}`}>{name}</a></div>
            <div className="project-item-subtitle">Owner: <a href="/">{ownerName}</a></div>
            {this.props.assignedAt.profile ? <div className="project-item-subtitle">Assined at: <a href="/">{fullname}</a></div> : ''}
          </div>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  assignedAt: React.PropTypes.object,
  task: React.PropTypes.object
};
