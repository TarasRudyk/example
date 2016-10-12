import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import md5 from 'js-md5';
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

    const isUsernameTaken = !this.state.firstStep ?
          Meteor.users.findOne({'profile.username':this.refs.username.value.trim()}) : undefined;
    const email = this.refs.email.value.trim().toLowerCase(),
          password = this.refs.password.value.trim();
    register(email, password, isUsernameTaken)
  }
  togglePassVisibility(event) {
    this.setState({showPass: event.target.checked});
  }
  render() {
    return (
      <div className="page-content">
        <form onSubmit={this.register}>
          <input type="email" name="email" ref="email" placeholder="Email"/>
          <input type={this.state.showPass ? 'text' : 'password'} ref="password" placeholder="Password"/>
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
