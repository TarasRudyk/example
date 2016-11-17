import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import Pagination from 'react-js-pagination';

import { allReadNotifications } from '/imports/api/notifications/actions';

import NotificationItem from '/imports/ui/pages/notifications/item';
import Loading from '/imports/ui/components/side-content/loading.jsx';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(page) {
    FlowRouter.setQueryParams({ page });
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
        <div className="container">
          <Pagination
            activePage={this.props.activePage || 1}
            totalItemsCount={this.props.notificationsCount}
            itemsCountPerPage={25}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  loaded: React.PropTypes.bool,
  notifications: React.PropTypes.arrayOf(React.PropTypes.object),
  notificationsCount: React.PropTypes.number,
  activePage: React.PropTypes.number
};
