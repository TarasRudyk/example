import React from 'react';


export default class AssignedUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { avatar, fullname } = this.props.user.profile;
    return (
      <div className="assigned-user">
        <img className="avatar" alt={this.props.user.username} width="32px" height="32px" src={avatar} />
        <div className="user-info">
          <div className="fullname">{fullname}</div>
          <div className="username">{this.props.user.username}</div>
        </div>
        <button type="button" onClick={e => this.props.onDelete(e)}>
          <i className="material-icons">cancel</i>
        </button>
      </div>
    );
  }
}

AssignedUser.propTypes = {
  user: React.PropTypes.object,
  onDelete: React.PropTypes.func
};
