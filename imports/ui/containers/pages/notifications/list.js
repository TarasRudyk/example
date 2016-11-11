import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notifications } from '/imports/api/notifications/notifications';
import NotificationsList from '/imports/ui/pages/notifications/list';

export default createContainer((data) => {
  const skip = ((parseInt((data.page), 10) * 25) - 25);
  const notificationsHandle = Meteor.subscribe('notifications');
  const notificationsCount = notificationsHandle.ready() ? Notifications.find().count() : 0;
  const notifications = notificationsHandle.ready() ? Notifications.find({},
    { sort: { creationDate: -1 }, skip, limit: 25 }).fetch() : [];

  return {
    notifications,
    notificationsCount,
    loaded: notificationsHandle.ready(),
    page: parseInt((data.page), 10)
  };
}, NotificationsList);
