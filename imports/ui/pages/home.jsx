import React from 'react';

import Dashboard from './dashboard';
import Landing from './landing';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
  }
  getContent() {
    if (this.props.userIsLogin) {
      return <Dashboard />;
    }

    return <Landing />;
  }
  render() {
    return (
      this.getContent()
    );
  }
}

Home.propTypes = {
  userIsLogin: React.PropTypes.bool
};
