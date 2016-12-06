import React from 'react';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { _id, name, author } = this.props.task;
    let fullname;
    if (this.props.assignedTo && this.props.assignedTo.profile) {
      fullname = this.props.assignedTo.profile.fullname;
    }

    return (
      <div className="list-item">
        <div className="project-item">
          <div className="project-item-information">
            <div className="project-item-title"><a href={`/task/${_id}`}>{name}</a></div>
            <div className="project-item-subtitle">Owner: <a href="/">{author.fullname}</a></div>
            {this.props.assignedTo && this.props.assignedTo.profile ?
              <div className="project-item-subtitle">Assined at: <a href="/">{fullname}</a></div> : ''}
          </div>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  assignedTo: React.PropTypes.object,
  task: React.PropTypes.object
};
