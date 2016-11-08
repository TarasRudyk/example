import React from 'react';
import clickOutside from 'react-click-outside';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };

    this.getAvatar = this.getAvatar.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  getAvatar() {
    if (this.props.userIsLogin && this.props.user) {
      return this.props.user.profile.avatar;
    }

    return '/images/avatar.png';
  }
  getUsername() {
    if (this.props.userIsLogin && this.props.user) {
      return this.props.user.username;
    }

    return '';
  }
  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }
  handleClickOutside() {
    this.setState({ showDropdown: false });
  }
  render() {
    return (
      <div className="header-user-info">
        <a href="" onClick={this.toggleDropdown}>
          <img src={this.getAvatar()} className="header-avatar" width="32px" height="32px" alt="User avatar" />
          <span className="header-username">{this.getUsername()}</span>
          <i className="material-icons">{this.state.showDropdown ? 'expand_less' : 'expand_more'}</i>
        </a>
        <div className={this.state.showDropdown ? 'header-dropdown active' : 'header-dropdown'}>
          <a href="/profile" onClick={this.toggleDropdown}>Profile</a>
          <a href="/elements" onClick={this.toggleDropdown}>Elements</a>
          <a href="/logout" onClick={this.toggleDropdown}>Log out</a>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object
};

export default clickOutside(UserInfo);
