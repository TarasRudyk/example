import React from 'react';

import UserSearch from '/imports/ui/containers/components/user-search/main';

export default class SingleProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { name, ownerName, description } = this.props.project;
    return (
      <main className="page-content page-project">
        <div className="page-separator">
          <div className="container">
            <div className="page-title">
              <h1>{name} <span>Owner: {ownerName}</span></h1>
              <div className="page-title-right-block">
                <a href="/" className="button green">Edit</a>
                <a href="/" className="button red">Remove</a>
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

            <UserSearch />
          </div>
        </div>
      </main>
    );
  }
}

SingleProject.propTypes = {
  project: React.PropTypes.object
};
