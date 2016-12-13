import React from 'react';

import Profile from '/imports/ui/components/navigation/profile';
import MainNavigation from '/imports/ui/components/navigation/navigation';

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
