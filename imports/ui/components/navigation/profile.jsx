import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <a href="/profile" className="profile">
        <span className="avatar">
          <img src={user.profile.avatar} width="34px" height="34px" alt={user.username} />
        </span>
        <span className="fullname">
          {user.profile.fullname}
        </span>
        <span className="username">
          {user.username}
        </span>
      </a>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.object
};
