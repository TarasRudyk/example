import React from 'react';

import Notices from '/imports/ui/containers/components/notices';
import AppNavigation from '/imports/ui/containers/components/navigation';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getNavigation = this.getNavigation.bind(this);
  }
  getNavigation() {
    if (this.props.userIsLogin) {
      return <AppNavigation
        user={this.props.user}
        userIsLogin={this.props.userIsLogin}
        notificationsCount={this.props.notificationsCount}
        assignedTasksCount={this.props.assignedTasksCount}
      />;
    }

    return null;
  }
  render() {
    return (
      <div className="app">
        {this.getNavigation()}
        {this.props.content}
        <Notices />
      </div>
    );
  }
}

MainLayout.propTypes = {
  content: React.PropTypes.element,
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object,
  notificationsCount: React.PropTypes.number,
  assignedTasksCount: React.PropTypes.number
};
