import React from 'react';
import formatValidation from 'string-format-validation';
import { TAPi18n } from 'meteor/tap:i18n';

import { signup } from '/imports/api/users/actions';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        error: ''
      },
      username: {
        value: '',
        error: ''
      },
      fullname: {
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
    this.togglePassVisibility = this.togglePassVisibility.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const email = this.state.email.value.trim().toLowerCase();
    const username = this.state.username.value.trim();
    const fullname = this.state.fullname.value.trim();
    const password = this.state.password.value.trim();
    const regExp = /^\w+$/;
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
    if (!regExp.test(username)) {
      this.setState({
        username: {
          value: username,
          error: 'Only letters and numbers'
        }
      });

      errors = true;
    }
    if (!formatValidation.validate({ min: 3, max: 25 }, username)) {
      this.setState({
        username: {
          value: username,
          error: TAPi18n.__('auth.usernameIncorrect')
        }
      });

      errors = true;
    }
    if (!formatValidation.validate({ min: 3, max: 25 }, fullname)) {
      this.setState({
        fullname: {
          value: fullname,
          error: TAPi18n.__('auth.fullnameIncorrect')
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
      signup(email, username, fullname, password);
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
  togglePassVisibility(event) {
    this.setState({ showPass: event.target.checked });
  }
  render() {
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign up</h1>
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
              className={this.state.username.error ? 'error' : ''}
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username.value}
              onChange={this.handleChange}
            />
            <span className="field-error">{this.state.username.error}</span>
            <input
              className={this.state.fullname.error ? 'error' : ''}
              type="text"
              name="fullname"
              placeholder="Full name"
              value={this.state.fullname.value}
              onChange={this.handleChange}
            />
            <span className="field-error">{this.state.fullname.error}</span>
            <input
              className={this.state.password.error ? 'error' : ''}
              type={this.state.showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={this.state.password.value}
              onChange={this.handleChange}
            />
            <span className="field-error">{this.state.password.error}</span>
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
            <input type="submit" value="Sign up" className="button green" />
          </form>
        </div>
      </div>
    );
  }
}
