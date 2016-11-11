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
      fieldsErrors: {
        email: '',
        username: '',
        fullname: '',
        password: ''
      }
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
  togglePassVisibility(event) {
    this.setState({ showPass: event.target.checked });
  }
  render() {
    const emailError = this.state.fieldsErrors.email ? <h1>Email is not correct</h1> : '';
    const usernameError = this.state.fieldsErrors.username ?
      <h1>Username must be at least 3 characters but less then 25 <br />
      and only letters and numbers  are allowed </h1> : '';
    const fullnameError = this.state.fieldsErrors.fullname ?
      <h1>Full name must be at least 3 characters but less then 25 <br />
      and only letters and numbers  are allowed </h1> : '';
    const passwordError = this.state.fieldsErrors.password ?
      <h1>Passwords must be at least 3 characters but less then 25</h1> : '';
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign up</h1>
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
            {emailError}
            <input
              className={this.state.fieldsErrors.username ? 'error' : ''}
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {usernameError}
            <input
              className={this.state.fieldsErrors.fullname ? 'error' : ''}
              type="text"
              name="fullname"
              placeholder="Full name"
              value={this.state.fullname}
              onChange={this.handleChange}
            />
            {fullnameError}
            <input
              className={this.state.fieldsErrors.password ? 'error' : ''}
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
