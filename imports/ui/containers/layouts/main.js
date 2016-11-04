import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';

import MainLayout from '/imports/ui/layouts/main';

export default createContainer(() => {
  const userIsLogin = !!Meteor.userId();
  const user = Meteor.user();

  const notificationsHandle = Meteor.subscribe('notifications');
  const notificationsCount = notificationsHandle.ready() ?
    Notifications.find({ read: false }).count() : 0;

  return {
    userIsLogin,
    user,
    notificationsCount
  };
}, MainLayout);
