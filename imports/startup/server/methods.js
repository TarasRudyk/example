import { Meteor } from 'meteor/meteor';

Meteor.methods({
  editUserData(data) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: {
          fullName: data.fullName ? data.fullName : Meteor.user().profile.fullName,
          username: data.username ? data.username : Meteor.user().profile.username,
          avatar: Meteor.user().profile.avatar
        }
      }
    });
  }
});
