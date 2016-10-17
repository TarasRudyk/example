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
      <div className="page-signup">
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
            minLength={6}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            required
            minLength={6}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            value={this.state.fullname}
            onChange={this.handleChange}
          />
          <input
            type={this.state.showPass ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            minLength={6}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="checkbox"
            checked={this.state.showPass}
            onChange={this.togglePassVisibility}
          />
          Show password
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
