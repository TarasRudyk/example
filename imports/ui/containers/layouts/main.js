import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';
import { Invitations } from '/imports/api/invitations/invitations';

import MainLayout from '/imports/ui/layouts/main';

export default createContainer(() => {
  const userIsLogin = !!Meteor.userId();
  const user = Meteor.user();

  const notificationsHandle = Meteor.subscribe('notifications');
  const notificationsCount = notificationsHandle.ready() ?
    Notifications.find({ read: false }).count() : 0;

  const invitationsHandle = Meteor.subscribe('invitations');
  const invitationsCount = invitationsHandle.ready() ?
    Invitations.find({ 'user.id': Meteor.userId(), replied: false }).count() : 0;

  const count = notificationsCount + invitationsCount;

  return {
    userIsLogin,
    user,
    notificationsCount: count
  };
}, MainLayout);
