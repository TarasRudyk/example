import React from 'react';

// import { createPTask } from '/imports/api/projects/actions';

export default class CreateTask extends React.Component {
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

    // const name = this.state.name.trim();
    // const description = this.state.description.trim();

    // createProject(name, description);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  render() {
    console.log(this);
    return (
      <div className="page-main-content page-create-project">
        <div className="container">
          <div className="title">
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
      </div>
    );
  }
}

CreateTask.propTypes = {
  projectOwnerId: React.PropTypes.string
};
