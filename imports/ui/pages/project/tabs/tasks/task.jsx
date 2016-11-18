import React from 'react';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, description } = this.props.task;

    return (
      <div className="page-main-content page-create-project">
        <div className="container">
          <div className="title">
            <h1>Task</h1>
          </div>
          <p>name: {name}</p>
          <p>description: {description}</p>
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object
};
