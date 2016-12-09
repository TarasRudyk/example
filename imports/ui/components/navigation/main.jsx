import React from 'react';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    const { userIsLogin, user } = this.props;

    if (!userIsLogin || !user) {
      return null;
    }

    return (
      <div className="app-navigation">
        <a href="/" className="logo">
          <img src="/images/logo.svg" width="28px" height="28px" alt="Karma" />
          <span>Karma</span>
        </a>
        <a href="/profile" className="user-info">
          <span className="avatar">
            <img src={user.profile.avatar} width="34px" height="34px" alt={user.username} />
          </span>
          <span className="fullname">
            {user.profile.fullname}
          </span>
          <span className="username">
            {user.username}
          </span>
        </a>
        <div className="main-nav">
          <a href="/projects">Projects</a>
          <a href="/">Timelogs</a>
          <a href="/">People</a>
          <a href="/">Collections</a>
          <a href="/">Leaderboard</a>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object
};
