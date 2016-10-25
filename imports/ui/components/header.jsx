import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getAvatar = this.getAvatar.bind(this);
    this.getNotificationsCount = this.getNotificationsCount.bind(this);
    this.getNotificationsClass = this.getNotificationsClass.bind(this);
  }
  getAvatar() {
    if (this.props.userIsLogin && this.props.user) {
      return this.props.user.profile.avatar;
    }

    return '/images/avatar.png';
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
          <nav className="nav-left">
            <a href="/" className="nav-logo">
              <img src="/images/logo.svg" width="32px" height="32px" alt="Karma" />
            </a>
            <a href="/projects">Projects</a>
            <a href="/">People</a>
            <a href="/">Collections</a>
            <a href="/">Leaderboard</a>
            <a href="/elements">Elements</a>
            <a href="/logout">Log out</a>
          </nav>
          <nav className="nav-right">
            <a href="/notifications" className={this.getNotificationsClass()}>
              <i className="material-icons">notifications_none</i>
              <span>{this.getNotificationsCount()}</span>
            </a>
            <a href="/" className="nav-user-inbox">
              <i className="material-icons">inbox</i>
            </a>
            <a href="/" className="nav-user-avatar">
              <img src={this.getAvatar()} width="32px" height="32px" alt="User avatar" />
            </a>
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
