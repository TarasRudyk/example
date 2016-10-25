import React from 'react';

import { allReadNotifications } from '/imports/api/notifications/actions';

import NotificationItem from '/imports/ui/pages/notifications/item';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <main className="page-content page-projects">
        <div className="page-separator">
          <div className="container">
            <div className="page-title">
              <h1>Notifications <span>all your notifications</span></h1>
              <div className="page-title-right-block">
                <button className="button green" onClick={allReadNotifications}>All read</button>
              </div>
            </div>
          </div>
        </div>
        <div className="list">
          <div className="container">
            {this.props.notifications.map((n, i) => (
              <NotificationItem
                key={i}
                notification={n}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.object)
};
