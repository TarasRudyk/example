import React from 'react';
import formatValidation from 'string-format-validation';
import { TAPi18n } from 'meteor/tap:i18n';
import { editProject } from '/imports/api/projects/actions.js';

export default class EditProject extends React.Component {
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

    const name = this.state.name.value.trim() || this.props.project.name;
    const description = this.state.description.value.trim() || this.props.project.description;

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
      editProject(name, description, this.props.project._id);
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
            <h1>Edit project</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="name"
              placeholder={this.props.project.name}
              autoFocus
              onChange={this.handleChange}
            />
            <span className="field-error">{this.state.name.error}</span>
            <textarea
              name="description"
              placeholder={this.props.project.description}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Edit"
              className="button green"
            />
          </form>
        </div>
      </div>
    );
  }
}


EditProject.propTypes = {
  project: React.PropTypes.object
};
