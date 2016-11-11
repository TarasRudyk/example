import React from 'react';

import { allReadNotifications } from '/imports/api/notifications/actions';

import NotificationItem from '/imports/ui/pages/notifications/item';
import InvitationItem from '/imports/ui/components/side-content/items/invitation';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getNotifications = this.getNotifications.bind(this);
  }
  getInvitations() {
    if (this.props.invitations.length > 0) {
      return (
        <div className="list">
          {this.props.invitations.map((inv, i) => (
            <InvitationItem invitation={inv} key={i} />
          ))}
        </div>
      );
    }
    return '';
  }
  getNotifications() {
    if (this.props.count > 1) {
      return (
        <div className="container">
          <div className="list">
            {this.props.notifications.map((n, i) => (
              <NotificationItem
                key={i}
                notification={n}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="no-notifications">
        <div className="container">
          No notifications yet
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="page-side-content-inner">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h2>NotificationsSide</h2>
              <div className="title-right-block">
                <button className="button green small" onClick={allReadNotifications}>All reads</button>
              </div>
            </div>
          </div>
        </div>
        {this.getInvitations()}
        {this.getNotifications()}
        <div className="page-side-content-bottom-panel">
          <a className="button default small" href="/notifications"> All notifications </a>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.object),
  invitations: React.PropTypes.arrayOf(React.PropTypes.object),
  count: React.PropTypes.number
};
