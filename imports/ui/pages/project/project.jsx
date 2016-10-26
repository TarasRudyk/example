import React from 'react';


export default class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
                <div className="button red">Remove</div>
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
