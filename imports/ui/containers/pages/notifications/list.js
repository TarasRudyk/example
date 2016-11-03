import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/local-state';
import { Notifications } from '/imports/api/notifications/notifications';
import NotificationsList from '/imports/ui/pages/notifications/list';

export default createContainer(() => {
  const notificationsHandle = Meteor.subscribe('notifications');
  const page = +getLocalState().get('notification-page') || 0;
  const notificationsCount = notificationsHandle.ready() ? Notifications.find().count() : 0;
  const notifications = notificationsHandle.ready() ? Notifications.find({},
    { sort: { creationDate: -1 }, limit: 25, skip: page * 25 }).fetch() : [];
  return {
    notifications,
    notificationsCount
  };
}, NotificationsList);
