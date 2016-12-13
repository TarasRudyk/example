/* global window, document */
import React from 'react';

import Profile from '/imports/ui/components/navigation/profile';
import MainNavigation from '/imports/ui/components/navigation/navigation';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };

    this.getHeight = this.getHeight.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.getHeight);
  }
  componentDidMount() {
    this.getHeight();
  }
  componentWillUnmount() {
    window.addEventListener('resize', this.getHeight);
  }
  getHeight() {
    const height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    this.setState({ height });
  }
  render() {
    const { userIsLogin, user } = this.props;

    if (!userIsLogin || !user) {
      return null;
    }

    return (
      <div className="app-navigation" style={{ height: `${this.state.height}px` }}>
        <a href="/" className="logo">
          <img src="/images/logo.svg" width="28px" height="28px" alt="Karma" />
          <span>Karma</span>
        </a>
        <Profile user={user} />
        <MainNavigation />
      </div>
    );
  }
}

Navigation.propTypes = {
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object
};
