import React from 'react';
import { Meteor } from 'meteor/meteor';

import { createInvitation } from '/imports/api/invitations/actions';

export default class UserSearchItem extends React.Component {
  constructor(props) {
    super(props);

    this.inviteUser = this.inviteUser.bind(this);
  }
  inviteUser() {
    createInvitation(this.props.projectId, this.props.user._id);
  }
  render() {
    const { username, profile } = this.props.user;

    return (
      <div className="user-search-item">
        <div className="user-search-item-info">
          <img src={profile.avatar} className="avatar" alt={username} width="32px" height="32px" />
          <div className="fullname">{profile.fullname}</div>
          <div className="username">{username}</div>
        </div>
        { Meteor.userId() === this.props.user._id ? null :
        <div className="user-search-item-action">
          <a href="" className="add-user" onClick={this.inviteUser}>
            <i className="material-icons">add_circle_outline</i>
          </a>
        </div> }
      </div>
    );
  }
}

UserSearchItem.propTypes = {
  user: React.PropTypes.object,
  projectId: React.PropTypes.string
};
