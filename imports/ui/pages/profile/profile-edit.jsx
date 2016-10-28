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

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const fullname = this.state.fullname.trim();
    const email = this.state.email.trim().toLowerCase();
    const oldPassword = this.state.oldPassword.trim();
    const newPassword = this.state.newPassword.trim();

    changeFullname(fullname);
    changeEmail(email);
    changePassword(oldPassword, newPassword);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  render() {
    const user = this.props.user;
    const email = user && user.emails && user.emails[0].address;
    const fullname = user && user.profile && user.profile.fullname;

    return (
      <main className="page-content">
        <div className="container">
          <div className="page-title">
            <h1>Edit Profile</h1>
          </div>

          <form onSubmit={this.onSubmit}>
            <label htmlFor="email">Change Email</label>
            <input
              type="email"
              name="email"
              placeholder={email}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="fullname"> Change Fullname </label>
            <input
              type="text"
              name="fullname"
              placeholder={fullname}
              value={this.state.fullname}
              onChange={this.handleChange}
            />
            <label htmlFor="oldPassword"> Old Password </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              value={this.state.oldPassword}
              onChange={this.handleChange}
            />
            <label htmlFor="newPassword"> Change Password </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={this.state.newPassword}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Submit Changes"
              className="button green"
            />
          </form>
        </div>
      </main>
    );
  }
}
ProfileEdit.propTypes = {
  user: React.PropTypes.object
};
