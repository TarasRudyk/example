import React from 'react';

import Header from '/imports/ui/components/header';
import Notices from '/imports/ui/containers/components/notices';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getHeader = this.getHeader.bind(this);
  }
  getHeader() {
    if (this.props.userIsLogin) {
      return <Header
        user={this.props.user}
        userIsLogin={this.props.userIsLogin}
        notificationsCount={this.props.notificationsCount}
      />;
    }

    return '';
  }
  render() {
    return (
      <div className="the-karma">
        {this.getHeader()}
        <div className="page">
          {this.props.content}
          <div className="page-side-content" />
        </div>
        <Notices />
      </div>
    );
  }
}

MainLayout.propTypes = {
  content: React.PropTypes.element,
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object,
  notificationsCount: React.PropTypes.number
};
