import React from 'react';

import { signin } from '/imports/api/users/actions';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const email = this.state.email.trim().toLowerCase();
    const password = this.state.password.trim();

    signin(email, password);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
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
              type="email"
              name="email"
              placeholder="Email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
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
