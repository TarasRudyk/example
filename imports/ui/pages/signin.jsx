import React from 'react';

import { signin } from '/imports/api/users/actions.js';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.signin = this.signin.bind(this);
  }
  signin(event) {
    event.preventDefault();

    const email = this.refs.email.value.trim().toLowerCase(),
          password = this.refs.password.value.trim();

    signin(email, password, this.props.userData);
  }
  render() {
    return (
      <div className="page-content">
        <form onSubmit={this.signin}>
          <input type="email" name="email" ref="email" placeholder="Email"/>
          <input type="password" name="password" ref="password" placeholder="Password"/>
          <input type="submit" value="Submit"/>
        </form>
        <label>{this.state.message}</label>
      </div>
    );
  }
}

Signin.propTypes = {
  userData: React.PropTypes.object
};
