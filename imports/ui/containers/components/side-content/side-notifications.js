import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';
import SideNotificationsList from '/imports/ui/components/side-content/side-notifications';

export default createContainer(() => {
  const notificationsHandle = Meteor.subscribe('notifications');
  const notifications = notificationsHandle.ready() ? Notifications.find().fetch() : [];

  return {
    notifications
  };
}, SideNotificationsList);
