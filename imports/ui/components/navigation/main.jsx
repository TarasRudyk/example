import React from 'react';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    return (
      <div className="app-navigation">
        <div className="logo">
          <a href="/">Karma</a>
        </div>
        <div className="user-info">
          usernamus
        </div>
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
