import React from 'react';

import { signin } from '/imports/api/users/actions';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const email = this.state.email.trim().toLowerCase();
    const password = this.state.password.trim();
    signin(email, password, (err) => {
      if (err === 'errorEmail') {
        this.setState({ emailError: true });
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
  render() {
    const emailError = this.state.emailError ? <h1>Email is not correct</h1> : false;
    const passwordError = this.state.passwordError ?
      <h1>Passwords must be at least 3 characters but less then 25</h1> : false;
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign in</h1>
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
              className={this.state.statusClass}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {passwordError}
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
