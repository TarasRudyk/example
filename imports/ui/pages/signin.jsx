import React from 'react';

import { signin } from '/imports/api/users/actions';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      emailStyle: { border: '' },
      passwordStyle: { border: '' },
      fieldsErrors: {
        email: '',
        password: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetError = this.resetError.bind(this);
    this.error = this.error.bind(this);
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
  resetError(event) {
    switch(event.target.name) {   // eslint-disable-line
      case 'email':
        this.setState({ emailError: false, emailStyle: { border: '' } });
        break;
      case 'password':
        this.setState({ passwordError: false, passwordStyle: { border: '' } });
        break;
    }
  }
  error() {
    this.setState({
      fieldsErrors: {
        email: 'fdfs',
        password: 'sdfs'
      }
    });
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  render() {
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
              className={this.state.fieldsErrors.email ? 'error' : ''}
              style={this.state.emailStyle}
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              onFocus={this.resetError}
            />
            {this.state.fieldsErrors.email}
            <input
              style={this.state.passwordStyle}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              onFocus={this.resetError}
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
