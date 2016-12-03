import React from 'react';
import formatValidation from 'string-format-validation';
import { TAPi18n } from 'meteor/tap:i18n';

import { signin } from '/imports/api/users/actions';
import InputField from '/imports/ui/components/input';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.textOnChange = this.textOnChange.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const email = this.state.email.value;
    const password = this.state.password.value;
    let errors = false;
    if (!formatValidation.validate({ type: 'email' }, email)) {
      this.setState({
        email: {
          error: TAPi18n.__('auth.emailIncorrect')
        }
      });
      errors = true;
    }
    if (!formatValidation.validate({ min: 3, max: 25 }, password)) {
      this.setState({
        password: {
          error: TAPi18n.__('auth.passwordIncorrect')
        }
      });
      errors = true;
    }
    if (!errors) {
      signin(email, password);
    }
  }
  textOnChange(target) {
    this.setState({
      [target.name]: {
        value: target.value.trim(),
        error: ''
      }
    });
  }
  render() {
    return (
      <div className="page-main-content page-signin">
        <div className="container">
          <div className="title">
            <h1>Sign in</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <InputField
              name="email"
              placeholder="Email"
              error={this.state.email.error}
              callback={this.textOnChange}
              autoFocus
            />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
              error={this.state.password.error}
              callback={this.textOnChange}
            />
            <a href="/" className="button">Back</a>
            <input type="submit" value="Sign in" className="button green" />
          </form>
        </div>
      </div>
    );
  }
}
