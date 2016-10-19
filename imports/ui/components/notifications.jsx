import React from 'react';
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

export default class Notifications extends React.Component {
  constructor() {
    super();

    this.state = {
      notifications: OrderedSet()
    };

    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }
  componentWillReceiveProps() {
    const { notifications } = this.props;

    if (!notifications || !notifications.length) return;

    let i = 0;
    const push = () => {
      this.addNotification(notifications[i]);

      i += 1;

      if (i < notifications.length) {
        setTimeout(push, 500);
      }
    };

    push();
  }
  addNotification(notification) {
    const { notifications } = this.state;
    const { text, id } = notification;

    return this.setState({
      notifications: notifications.add({
        message: text,
        key: id,
        dismissAfter: 4000,
        onClick: () => this.removeNotification(id)
      })
    });
  }

  removeNotification(count) {
    const { notifications } = this.state;
    this.setState({
      notifications: notifications.filter(n => n.key !== count)
    });
  }

  render() {
    return (
      <div>
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={notification => this.setState({
            notifications: this.state.notifications.delete(notification)
          })}
        />
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.array
};
