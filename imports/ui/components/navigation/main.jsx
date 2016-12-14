/* global window, document */
import React from 'react';

import { getLocalState } from '/imports/startup/client/local-state';

import Navigation from '/imports/ui/components/navigation/navigation';
import Notifications from '/imports/ui/containers/components/navigation/notifications';
import Tasks from '/imports/ui/containers/components/navigation/tasks';

export default class AppNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appHeight: 0
    };

    this.getContent = this.getContent.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getActiveClass = this.getActiveClass.bind(this);
    this.switchTabs = this.switchTabs.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.getHeight);
  }
  componentDidMount() {
    this.getHeight();
  }
  componentWillUnmount() {
    window.addEventListener('resize', this.getHeight);
  }
  getContent() {
    switch (this.props.appNavigation) {
      case 'notifications':
        return <Notifications />;
      case 'tasks':
        return <Tasks />;
      case 'comments':
        return <Tasks />;
      default:
        return <Navigation user={this.props.user} />;
    }
  }
  getHeight() {
    const appHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    this.setState({ appHeight });
  }
  getActiveClass(currentTarget) {
    if (!currentTarget) return '';
    return this.props.appNavigation === currentTarget.dataset.name ? 'active' : '';
  }
  switchTabs({ currentTarget }) {
    if (currentTarget && currentTarget.dataset.name) {
      const currentTab = this.props.appNavigation;

      if (currentTab && currentTab === currentTarget.dataset.name) {
        getLocalState().set('app-navigation', 'navigation');
      } else {
        getLocalState().set('app-navigation', currentTarget.dataset.name);
      }
    }
  }
  render() {
    const { userIsLogin, user } = this.props;

    if (!userIsLogin || !user) {
      return null;
    }

    return (
      <div className="app-navigation" style={{ height: `${this.state.appHeight}px` }}>
        <div className="app-navigation-content">
          {this.getContent()}
        </div>
        <div className="app-navigation-tabs">
          <a
            href=""
            ref={(t) => { this.tasksTab = t; }}
            className={`${this.getActiveClass(this.tasksTab)}`}
            data-name="tasks"
            onClick={this.switchTabs}
          >
            <i className="material-icons">inbox</i>
          </a>
          <a
            href=""
            ref={(t) => { this.commentsTab = t; }}
            className={`${this.getActiveClass(this.commentsTab)}`}
            data-name="comments"
            onClick={this.switchTabs}
          >
            <i className="material-icons">forum</i>
          </a>
          <a
            href=""
            ref={(t) => { this.notificationsTab = t; }}
            className={`${this.getActiveClass(this.notificationsTab)}`}
            data-name="notifications"
            onClick={this.switchTabs}
          >
            <i className="material-icons">notifications_none</i>
          </a>
        </div>
      </div>
    );
  }
}

AppNavigation.propTypes = {
  appNavigation: React.PropTypes.string,
  userIsLogin: React.PropTypes.bool,
  user: React.PropTypes.object
};
