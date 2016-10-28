import React from 'react';

import { signup } from '/imports/api/users/actions';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      fullname: '',
      password: '',
      showPass: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.togglePassVisibility = this.togglePassVisibility.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const email = this.state.email.trim().toLowerCase();
    const username = this.state.username.trim();
    const fullname = this.state.fullname.trim();
    const password = this.state.password.trim();

    signup(email, username, fullname, password);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  togglePassVisibility(event) {
    this.setState({ showPass: event.target.checked });
  }
  render() {
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign up</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              minLength={6}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="fullname"
              placeholder="Full name"
              required
              value={this.state.fullname}
              onChange={this.handleChange}
            />
            <input
              type={this.state.showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />

            <div className="show-password hidden">
              <input
                id="show-password"
                type="checkbox"
                checked={this.state.showPass}
                onChange={this.togglePassVisibility}
              />
              <label htmlFor="show-password">Show password</label>
            </div>

            <a href="/" className="button">Back</a>
            <input
              type="submit"
              value="Sign up"
              className="button green"
            />
          </form>
        </div>
      </div>
    );
  }
}
