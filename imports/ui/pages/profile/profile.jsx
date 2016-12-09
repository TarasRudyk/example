import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
    this.showButton = this.showButton.bind(this);
  }
  showButton(user = this.props.user) {
    if (user && user._id === Meteor.userId()) {
      return (<a className="button green" href="/profile/edit">Edit</a>);
    }
    return '';
  }
  render() {
    const { user } = this.props;
    const username = user && user.username;
    const email = user && user.emails && user.emails[0].address;
    const fullname = user && user.profile && user.profile.fullname;

    return (
      <div className="app-content">
        <div className="container">
          <div className="page-title">
            <h1>Profile</h1>
          </div>
          <p>
            Username : {username} <br />
            Email: {email} <br />
            Fullname: {fullname} <br />
          </p>
          { this.showButton() }
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  user: React.PropTypes.object
};
