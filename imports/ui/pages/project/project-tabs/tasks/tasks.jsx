import React from 'react';

export default class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log(this);
    const { projectId } = this.props;
    return (
      <div>
        <h1>Tasks</h1>
        <a href={`/project/${projectId}/task/create`} className="button green">New task</a>
      </div>
    );
  }
}

Tasks.propTypes = {
  projectId: React.PropTypes.string
  // projectOwnerId: React.PropTypes.string
};
