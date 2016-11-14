import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';

import { signin } from '/imports/api/users/actions';

import formatValidation from 'string-format-validation';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const email = this.state.email.value.trim().toLowerCase();
    const password = this.state.password.value.trim();
    let errors = false;

    if (!formatValidation.validate({ type: 'email' }, email)) {
      this.setState({
        email: {
          value: email,
          error: TAPi18n.__('auth.emailIncorrect')
        }
      });

      errors = true;
    }
    if (!formatValidation.validate({ min: 3, max: 25 }, password)) {
      this.setState({
        password: {
          value: password,
          error: TAPi18n.__('auth.passwordIncorrect')
        }
      });

      errors = true;
    }
    if (!errors) {
      signin(email, password);
    }
  }
  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: {
          value: target.value,
          error: ''
        }
      });
    }
  }
  render() {
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign in</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              className={this.state.email.error ? 'error' : ''}
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email.value}
              onChange={this.handleChange}
            />
            <span className="field-error">{this.state.email.error}</span>
            <input
              className={this.state.password.error ? 'error' : ''}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password.value}
              onChange={this.handleChange}
            />
            <span className="field-error">{this.state.password.error}</span>
            <a href="/" className="button">Back</a>
            <input type="submit" value="Sign in" className="button green" />
          </form>
        </div>
      </div>
    );
  }
}
