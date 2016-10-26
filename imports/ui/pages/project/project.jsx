import React from 'react';
import { deleteProject } from '/imports/api/projects/actions.js';

export default class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler(e) {
    const id = e.target.value;
    const conf = confirm('Are you sure?'); // eslint-disable-line
    if (conf) {
      deleteProject(id);
    }
  }

  render() {
    const { _id, name, ownerName, description } = this.props.project;

    return (
      <main className="page-content page-project">
        <div className="page-separator">
          <div className="container">
            <div className="page-title">
              <h1>{name} <span>Owner: {ownerName}</span></h1>
              <div className="page-title-right-block">
                <a href={`/project/edit/${_id}`} className="button green">Edit</a>
                <button className="button red" value={_id} onClick={this.deleteHandler}>Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="project-description">
            <div className="page-title">
              <h2>About</h2>
            </div>
            {description || 'No description of the project'}
          </div>
          <div className="project-users">
            <div className="page-title">
              <h2>Users</h2>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

SingleProject.propTypes = {
  project: React.PropTypes.object
};
