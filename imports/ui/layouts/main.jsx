import React from 'react';

import Header from '/imports/ui/components/header';
import Notifications from '/imports/ui/containers/components/notifications';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="the-karma">
        {this.props.userIsLogin ? <Header user={this.props.user} userIsLogin={this.props.userIsLogin} /> : ''}
        {this.props.content}
        <Notifications />
      </div>
    );
  }
}

MainLayout.propTypes = {
  content: React.PropTypes.element,
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object
};
