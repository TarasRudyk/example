import React from 'react';

import { allReadNotifications } from '/imports/api/notifications/actions';

import NotificationItem from '/imports/ui/pages/notifications/item';
import InvitationItem from '/imports/ui/components/navigation/items/invitation';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    return null;
  }
  getNotifications() {
    if (this.props.count > 0) {
      return (
        <div className="list">
          {this.props.notifications.map((n, i) => (
            <NotificationItem
              key={i}
              notification={n}
            />
          ))}
        </div>
      );
    }

    return null;
  }
  render() {
    return (
      <div className="page-side-content-wrapper">
        <div className="page-side-content-inner">
          <div className="separator">
            <div className="container">
              <div className="title">
                <h2>Notifications</h2>
                <div className="title-right-block">
                  <button className="button green small" onClick={allReadNotifications}>All read</button>
                </div>
              </div>
            </div>
          </div>
          <div className="page-side-content-panel">
            <div className="page-side-content-panel-inner">
              <div className="page-side-content-lists">
                {this.getInvitations()}
                {this.getNotifications()}
                {!this.props.count ? (
                  <div className="no-notifications">
                    <div className="container">
                      No notifications yet
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="page-side-content-bottom-panel">
            <a className="button default small" href="/notifications"> All notifications </a>
          </div>
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
