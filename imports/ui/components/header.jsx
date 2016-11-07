import React from 'react';

import { toggleSideContent } from '/imports/api/side-content/actions';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };

    this.getAvatar = this.getAvatar.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.getNotificationsCount = this.getNotificationsCount.bind(this);
    this.getNotificationsClass = this.getNotificationsClass.bind(this);
    this.toggleSideContent = this.toggleSideContent.bind(this);
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
  getNotificationsCount() {
    if (this.props.notificationsCount > 9) {
      return '9+';
    }

    return this.props.notificationsCount;
  }
  getNotificationsClass() {
    return this.props.notificationsCount ? 'nav-messages active' : 'nav-messages';
  }
  toggleSideContent({ currentTarget }) {
    if (currentTarget && currentTarget.dataset.name) {
      toggleSideContent(currentTarget.dataset.name);
    }
  }
  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }
  render() {
    return (
      <header>
        <div className="container">
          <div className="header-main-nav">
            <a href="/" className="header-logo">
              <img src="/images/logo.svg" width="32px" height="32px" alt="Karma" />
            </a>
            <a href="/projects">Projects</a>
            <a href="/">People</a>
            <a href="/">Collections</a>
            <a href="/">Leaderboard</a>
          </div>
          <nav className="header-user-panel">
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
            <div className="header-user-nav">
              <a
                href=""
                className={this.getNotificationsClass()}
                data-name="notifications"
                onClick={this.toggleSideContent}
              >
                <i className="material-icons">notifications_none</i>
                <span>{this.getNotificationsCount()}</span>
              </a>
              <a href="" className="nav-all-tasks" data-name="tasks" onClick={this.toggleSideContent}>
                <i className="material-icons">inbox</i>
              </a>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object,
  notificationsCount: React.PropTypes.number
};
