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
      showPass: false,
      emailError: false,
      usernameError: false,
      fullnameError: false,
      passwordError: false
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

    signup(email, username, fullname, password, (err) => {
      if (err === 'errorEmail') {
        this.setState({ emailError: true });
      }
      if (err === 'errorUsername') {
        this.setState({ usernameError: true });
      }
      if (err === 'errorFullname') {
        this.setState({ fullnameError: true });
      }
      if (err === 'errorPassword') {
        this.setState({ passwordError: true });
      }
    });
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
    const emailError = this.state.emailError ? <h1>Email is not correct</h1> : false;
    const usernameError = this.state.usernameError ?
      <h1>Username must be at least 3 characters but less then 25</h1> : false;
    const fullnameError = this.state.fullnameError ?
      <h1>Full name must be at least 3 characters but less then 25</h1> : false;
    const passwordError = this.state.passwordError ?
      <h1>Passwords must be at least 3 characters but less then 25</h1> : false;
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign up</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {emailError}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {usernameError}
            <input
              type="text"
              name="fullname"
              placeholder="Full name"
              value={this.state.fullname}
              onChange={this.handleChange}
            />
            {fullnameError}
            <input
              type={this.state.showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {passwordError}

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
