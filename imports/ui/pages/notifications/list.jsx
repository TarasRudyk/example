import React from 'react';

import { getLocalState } from '/imports/startup/client/local-state';
import { allReadNotifications } from '/imports/api/notifications/actions';

import NotificationItem from '/imports/ui/pages/notifications/item';
import Loading from '/imports/ui/components/side-content/loading.jsx';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.next = this.next.bind(this);
  }
  componentDidMount() {
    const componentName = getLocalState().get('side-content');
    if (componentName === 'notifications') {
      getLocalState().set('side-content', '');
    }
  }
  prev() {
    const page = +getLocalState().get('notification-page') || 0;
    if (page > 0) {
      getLocalState().set('notification-page', page - 1);
    }
  }
  next() {
    const page = +getLocalState().get('notification-page') || 0;
    if (page < (this.props.notificationsCount / 25) - 1) {
      getLocalState().set('notification-page', page + 1);
    }
  }

  render() {
    return (
      <div className="page-main-content page-projects">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h1>Notifications <span>all your notifications</span></h1>
              <div className="title-right-block">
                <button className="button green" onClick={allReadNotifications}>All read</button>
              </div>
            </div>
          </div>
        </div>
        <div className="list">
          <div className="container">
            {this.props.loaded ? this.props.notifications.map((n, i) => (
              <NotificationItem
                key={i}
                notification={n}
              />
            )) : <Loading /> }
          </div>
        </div>
        <button className="button" onClick={this.prev}> Prev </button>
        <button className="button" onClick={this.next}> Next </button>
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.object),
  notificationsCount: React.PropTypes.number,
  loaded: React.PropTypes.bool
};
