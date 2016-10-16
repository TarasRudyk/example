import React from 'react';

import { signin } from '/imports/api/users/actions.js';

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
      <div className="page-content">
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
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

Signin.propTypes = {
  user: React.PropTypes.object
};
