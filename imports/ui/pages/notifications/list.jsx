import React from 'react';

import { Pagination } from 'react-bootstrap';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { allReadNotifications } from '/imports/api/notifications/actions';

import NotificationItem from '/imports/ui/pages/notifications/item';
import Loading from '/imports/ui/components/side-content/loading.jsx';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activePage: this.props.page };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    const activePage = { activePage: eventKey };
    this.setState(activePage);
    FlowRouter.setQueryParams({ page: eventKey });
  }

  render() {
    const pages = Math.ceil(this.props.notificationsCount / 25);
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
        {(pages > 1) ?
          <div className="container text-center">
            <Pagination
              className="projects-pagination pull-center"
              bsSize="large"
              prev
              next
              first
              last
              boundaryLinks
              items={pages}
              maxButtons={10}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}
            />
          </div>
      : null}
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.object),
  notificationsCount: React.PropTypes.number,
  page: React.PropTypes.number,
  loaded: React.PropTypes.bool
};
