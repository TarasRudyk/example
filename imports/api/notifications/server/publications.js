/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Notifications } from '../notifications';

Meteor.publish('notifications', function (limit = 0, skip = 0) {
  return Notifications.find({ recipientId: this.userId },
     { sort: { createdAt: -1 }, limit, skip });
});

Meteor.publish('notifications-new', function () {
  return Notifications.find({ recipientId: this.userId, isReaded: false },
    { sort: { createdAt: -1 } });
});

Meteor.publish('notifications-isReaded', function (limit = 0, skip = 0) {
  return Notifications.find({ recipientId: this.userId, isReaded: true },
    { sort: { createdAt: -1 }, limit, skip });
});
