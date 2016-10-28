import React from 'react';

import { editProject } from '/imports/api/projects/actions.js';

export default class EditProject extends React.Component {
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

    const name = this.state.name.trim() || this.props.project.name;
    const description = this.state.description.trim() || this.props.project.description;

    editProject(name, description, this.props.project._id);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
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
