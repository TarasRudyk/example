import { Meteor } from 'meteor/meteor';
import React from 'react';

import { createProject } from '/imports/api/projects/actions';
import { createNotification } from '/imports/api/notifications/actions';

export default class CreateProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const name = this.state.name.trim();
    const description = this.state.description.trim();

    createNotification('You were added to the project', 'projects', '/projects/invitation/username', Meteor.userId());

    createProject(name, description);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  render() {
    return (
      <main className="page-content page-create-project">
        <div className="container">
          <div className="page-title">
            <h1>Create project</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
              onCopy={this.handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={this.state.password}
              onChange={this.handleChange}
              onCopy={this.handleChange}
            />
            <input
              type="submit"
              value="Create"
              className="button green"
            />
          </form>
        </div>
      </main>
    );
  }
}

CreateProject.propTypes = {};
