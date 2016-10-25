import React from 'react';

export default class UserSearchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { username, profile } = this.props.user;
    return (
      <div>
        <p>{username}</p>
        <p>{profile.fullname}</p>
      </div>
    );
  }
}

UserSearchItem.propTypes = {
  user: React.PropTypes.object
};
