import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { register } from '/imports/api/users/actions.js';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: false,
      firstStep: true,
      message: ''
    };
    this.register = this.register.bind(this);
    this.togglePassVisibility = this.togglePassVisibility.bind(this);
  }
  register(event) {
    event.preventDefault();
    const email = this.refs.email.value.trim().toLowerCase(),
          password = this.refs.password.value.trim();
    const isUsernameTaken = !this.state.firstStep ?
          Meteor.users.findOne({'profile.username': this.refs.username.value.trim() }) : undefined;

    register(email, password, isUsernameTaken)
  }
  togglePassVisibility(event) {
    this.setState({showPass: event.target.checked});
  }
  render() {
    return (
      <div className="page-content">
        <form onSubmit={this.register}>
          <input
            type="email"
            name="email"
            ref="email"
            placeholder="Email"
            required={true}
            minLength={6}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"/>
          <input
            type={this.state.showPass ? 'text' : 'password'}
            name="password"
            ref="password"
            placeholder="Password"
            required={true}
            minLength={6}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/>
          <input type="checkbox" onChange={this.togglePassVisibility} />Show password
          <input type="submit" value="Submit"/>
        </form>
        <label>{this.state.message}</label>
      </div>
    );
  }
}

Signup.propTypes = {
  userData: React.PropTypes.object
};
