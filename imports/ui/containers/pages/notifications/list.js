import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';

import NotificationsList from '/imports/ui/pages/notifications/list';

export default createContainer(({ page }) => {
  const skip = ((parseInt((page), 10) * 25) - 25);
  const query = { sort: { createdAt: -1 }, skip, limit: 25 };

  const notificationsHandle = Meteor.subscribe('notifications');
  const notifications = notificationsHandle.ready() ? Notifications.find({}, query).fetch() : [];
  const notificationsCount = notificationsHandle.ready() ? Notifications.find().count() : 0;

  return {
    loaded: notificationsHandle.ready(),
    notifications,
    notificationsCount,
    activePage: parseInt((page), 10)
  };
}, NotificationsList);
