import React from 'react';

const Header = () => (
  <header>
    <div className="container">
      <nav className="nav-left">
        <a href="/" className="nav-logo">
          <img src="images/logo.svg" width="32px" height="32px" alt="Karma" />
        </a>
        <a href="/">Projects</a>
        <a href="/">People</a>
        <a href="/">Collections</a>
        <a href="/">Leaderboard</a>
      </nav>
      <nav className="nav-right">
        <a href="/" className="nav-user-avatar">
          <img src="images/avatar-sample.png" width="32px" height="32px" alt="User avatar" />
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
