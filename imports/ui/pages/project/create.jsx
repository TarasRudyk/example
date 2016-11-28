import React from 'react';
import formatValidation from 'string-format-validation';
import { TAPi18n } from 'meteor/tap:i18n';

import { createProject } from '/imports/api/projects/actions';

export default class CreateProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: '',
        error: ''
      },
      description: {
        value: '',
        error: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const name = this.state.name.value.trim();
    const description = this.state.description.value.trim();

    let errors = false;

    if (!formatValidation.validate({ min: 3, max: 25 }, name)) {
      this.setState({
        name: {
          value: name,
          error: TAPi18n.__('create.ProjectNameRequired')
        }
      });

      errors = true;
    }

    if (!errors) {
      createProject(name, description);
    }
  }
  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: {
          value: target.value,
          error: ''
        }
      });
    }
  }
  render() {
    return (
      <div className="page-main-content page-create-project">
        <div className="container">
          <div className="title">
            <h1>New project</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              className={this.state.name.error ? 'error' : 'light'}
              type="text"
              name="name"
              placeholder="Project name"
              autoFocus
              value={this.state.name.value}
              onChange={this.handleChange}
              onCopy={this.handleChange}
            />
            <span className="field-error">{this.state.name.error}</span>
            <textarea
              name="description"
              className="light"
              placeholder="Description"
              value={this.state.description.value}
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
      </div>
    );
  }
}
