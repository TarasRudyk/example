import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';
import { Invitations } from '/imports/api/invitations/invitations';

import NotificationsList from '/imports/ui/components/side-content/notifications';

export default createContainer(() => {
  const notificationsHandle = Meteor.subscribe('notifications');
  const notifications = notificationsHandle.ready() ?
    Notifications.find({}, { sort: { creationDate: -1 }, limit: 15, skip: 0 }).fetch() : [];

  const notificationsCount = notificationsHandle.ready() ? Notifications.find().count() : 0;

  const invitationsHandle = Meteor.subscribe('invitations');
  const invitations = invitationsHandle.ready() ?
    Invitations.find({ 'project.ownerId': { $ne: Meteor.userId() }, replied: false }, { sort: { creationDate: -1 }, limit: 15, skip: 0 }).fetch() : [];
  const invitationsCount = invitationsHandle.ready() ? Invitations.find().count() : 0;

  const count = notificationsCount + invitationsCount;
  // const notifInvit = notifications.concat(invitations).slice(0, 15);
  return {
    notifications,
    invitations,
    count
  };
}, NotificationsList);
