import React from 'react';

import { signin } from '/imports/api/users/actions';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fieldsErrors: {
        email: '',
        password: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const email = this.state.email.trim().toLowerCase();
    const password = this.state.password.trim();

    signin(email, password, (err) => {
      if (err) {
        this.setState({
          fieldsErrors: err
        });
      }
    });
  }
  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value,
        fieldsErrors: ''
      });
    }
  }
  render() {
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign in</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              className={this.state.fieldsErrors.email ? 'error' : ''}
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <h1>{this.state.fieldsErrors.email}</h1>
            <input
              className={this.state.fieldsErrors.password ? 'error' : ''}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <h1>{this.state.fieldsErrors.password}</h1>
            <a href="/" className="button">Back</a>
            <input
              type="submit"
              value="Sign in"
              className="button green"
            />
          </form>
        </div>
      </div>
    );
  }
}
