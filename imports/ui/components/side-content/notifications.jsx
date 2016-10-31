import React from 'react';

import { allReadNotifications } from '/imports/api/notifications/actions';

import NotificationItem from '/imports/ui/pages/notifications/item';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getNotifications = this.getNotifications.bind(this);
  }

  getNotifications() {
    if (this.props.notifications.length > 0) {
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
      <div className="container">
        <p>No notifications yet</p>
      </div>
    );
  }

  render() {
    return (
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
        {this.getNotifications()}
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.object)
};
