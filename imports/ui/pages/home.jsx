import React from 'react';

import Dashboard from '/imports/ui/containers/pages/dashboard';
import Landing from './landing';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
  }
  getContent() {
    if (this.props.userIsLogin) {
      return <Dashboard date={this.props.date} />;
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
  date: React.PropTypes.string,
  userIsLogin: React.PropTypes.bool
};
