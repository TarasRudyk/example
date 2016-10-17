import React from 'react';

import Dashboard from './dashboard';
import Landing from './landing';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="page-content">
        {this.props.userIsLogin ? <Dashboard /> : <Landing />}
      </div>
    );
  }
}

Home.propTypes = {
  userIsLogin: React.PropTypes.bool
};
