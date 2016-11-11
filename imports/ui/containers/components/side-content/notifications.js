import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';
import { Invitations } from '/imports/api/invitations/invitations';

import NotificationsList from '/imports/ui/components/side-content/notifications';

export default createContainer(() => {
  let notificationsHandle = Meteor.subscribe('notifications-new');
  let notifications = notificationsHandle.ready()
    ? Notifications.find({ read: false }, { sort: { creationDate: -1 } }).fetch()
    : [];

  const count = Notifications.find().count();


  notificationsHandle = Meteor.subscribe('notifications-read', 15 - count, 0);
  notifications = notificationsHandle.ready()
      ? notifications.concat(Notifications.find({ read: true },
        { sort: { creationDate: -1 }, limit: 15 - count }).fetch())
      : notifications;


  const invitationsHandle = Meteor.subscribe('invitations');
  const invitations = invitationsHandle.ready()
    ? Invitations.find({ 'user.id': Meteor.userId(), replied: false }, { sort: { creationDate: -1 } }).fetch()
    : [];

  return {
    notifications,
    invitations,
    count
  };
}, NotificationsList);
