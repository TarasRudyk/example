import React from 'react';

import { toggleSideContent } from '/imports/api/side-content/actions';

import UserInfo from './header/user-info';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getNotificationsCount = this.getNotificationsCount.bind(this);
    this.getNotificationsClass = this.getNotificationsClass.bind(this);
    this.toggleSideContent = this.toggleSideContent.bind(this);
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
  getActiveClass(currentTarget) {
    if (!currentTarget) return '';
    return this.props.sideContentName === currentTarget.dataset.name ? 'active' : '';
  }
  toggleSideContent({ currentTarget }) {
    if (currentTarget && currentTarget.dataset.name) {
      toggleSideContent(currentTarget.dataset.name);
    }
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
            <UserInfo userIsLogin={this.props.userIsLogin} user={this.props.user} />

            <div className="header-user-nav">
              <a
                ref={(c) => { this.notifBtnElem = c; }}
                href=""
                className={`${this.getNotificationsClass()} ${this.getActiveClass(this.notifBtnElem)}`}
                data-name="notifications"
                onClick={this.toggleSideContent}
              >
                <i className="material-icons">notifications_none</i>
                <span>{this.getNotificationsCount()}</span>
              </a>
              <a
                ref={(c) => { this.tasksBtnElem = c; }}
                href=""
                className={`nav-all-tasks ${this.getActiveClass(this.tasksBtnElem)}`}
                data-name="tasks" onClick={this.toggleSideContent}
              >
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
  notificationsCount: React.PropTypes.number,
  sideContentName: React.PropTypes.string
};
