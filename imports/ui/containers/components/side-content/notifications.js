import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';
import NotificationsList from '/imports/ui/components/side-content/notifications';

export default createContainer(() => {
  let notificationsHandle = Meteor.subscribe('notifications-new');
  let notifications = notificationsHandle.ready()
    ? Notifications.find({}, { sort: { creationDate: -1 } }).fetch()
    : [];
  const unreadCount = Notifications.find({ read: false }).count();
  if (unreadCount < 15 && notificationsHandle.ready()) {
    notificationsHandle = Meteor.subscribe('notifications-read', 15 - unreadCount, 0);
    notifications = notificationsHandle.ready()
      ? Notifications.find({}, { sort: { creationDate: -1 } }).fetch()
      : [];
  }
  console.log(Notifications.find().fetch());
  return {
    notifications
  };
}, NotificationsList);
