import React from 'react';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { name, _id } = this.props.task;
    const link = `/task/${_id}`;
    return (
      <div className="list-item task-item">
        <a href={link}>{name}</a>
      </div>
    );
  }
}

TaskItem.propTypes = {
  task: React.PropTypes.object
};
