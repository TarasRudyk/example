import React from 'react';

export default class AssignUserItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { avatar, fullname } = this.props.user.profile;
    return (
      <a href="" className="assign-user-item" onClick={this.props.onClick}>
        <img className="avatar" alt={this.props.user.username} width="32px" height="32px" src={avatar} />
        <div className="user-info">
          <div className="fullname">{fullname}</div>
          <div className="username">{this.props.user.username}</div>
        </div>
      </a>
    );
  }
}

AssignUserItem.propTypes = {
  user: React.PropTypes.object,
  onClick: React.PropTypes.func
};
