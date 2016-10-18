import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    user.profile = options.profile ? options.profile : {};
    user.colors = [
      { used: false, color: '#5d8aa8' },
      { used: false, color: '#f0f8ff' },
      { used: false, color: '#e32636' },
      { used: false, color: '#efdecd' },
      { used: false, color: '#ffbf00' },
      { used: false, color: '#a4c639' },
      { used: false, color: '#9966cc' },
      { used: false, color: '#00ffff' }
    ];
    user.projects = [];

    return user;
  });
}
