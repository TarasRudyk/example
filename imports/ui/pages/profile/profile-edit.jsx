import React from 'react';

import { changeEmail, changeFullname, changePassword } from '/imports/api/users/actions';

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fullname: '',
      oldPassword: '',
      newPassword: ''
    };

    this.onEmailSubmit = this.onEmailSubmit.bind(this);
    this.onFullnameSubmit = this.onFullnameSubmit.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onFullnameSubmit(event) {
    event.preventDefault();

    const fullname = this.state.fullname.trim();

    changeFullname(fullname);
  }
  onEmailSubmit(event) {
    event.preventDefault();

    const email = this.state.email.trim().toLowerCase();

    changeEmail(email);
  }
  onPasswordSubmit(event) {
    event.preventDefault();

    const oldPassword = this.state.oldPassword;
    const newPassword = this.state.newPassword;

    changePassword(oldPassword, newPassword);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  render() {
    return (
      <main className="page-content">
        <div className="container">
          <div className="page-title">
            <h1>Edit Profile</h1>
          </div>
          <h3> Change Email </h3>
          <form onSubmit={this.onEmailSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Change Email"
              className="button green"
            />
          </form>

          <h3> Change Fullname </h3>
          <form onSubmit={this.onFullnameSubmit}>
            <input
              type="text"
              name="fullname"
              placeholder="Change Fullname"
              required
              value={this.state.fullname}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Change Fullname"
              className="button green"
            />
          </form>

          <h3> Change Password </h3>
          <form onSubmit={this.onPasswordSubmit}>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              required
              value={this.state.oldPassword}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              required
              value={this.state.newPassword}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Change Password"
              className="button green"
            />
          </form>
        </div>
      </main>
    );
  }
}
