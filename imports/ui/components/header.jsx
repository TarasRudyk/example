import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getAvatar = this.getAvatar.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.getNotificationsCount = this.getNotificationsCount.bind(this);
    this.getNotificationsClass = this.getNotificationsClass.bind(this);
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
    return this.props.notificationsCount ? 'nav-user-messages active' : 'nav-user-messages';
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
              <a href="/">
                <img src={this.getAvatar()} className="header-avatar" width="32px" height="32px" alt="User avatar" />
                <span className="header-username">{this.getUsername()}</span>
                <i className="material-icons">expand_more</i>
              </a>
            </div>
            <div className="header-user-nav">
              <a href="/notifications" className={this.getNotificationsClass()}>
                <i className="material-icons">notifications_none</i>
                <span>{this.getNotificationsCount()}</span>
              </a>
              <a href="/" className="nav-user-inbox">
                <i className="material-icons">inbox</i>
              </a>
              <a href="/" className="nav-user-all-tasks">
                <i className="material-icons">view_agenda</i>
              </a>
            </div>
            <div className="nav-user-submenu hidden">
              <a href="/">Profile</a>
              <a href="/elements">Elements</a>
              <a href="/logout">Log out</a>
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
