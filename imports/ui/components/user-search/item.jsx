import React from 'react';

export default class UserSearchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { username, profile } = this.props.user;
    return (
      <div className="user-search-item">
        <img src={profile.avatar} className="avatar" alt={username} width="32px" height="32px" />
        <div className="fullname">{profile.fullname}</div>
        <div className="username">{username}</div>
      </div>
    );
  }
}

UserSearchItem.propTypes = {
  user: React.PropTypes.object
};
