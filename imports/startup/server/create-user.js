import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    user.profile = options.profile ? options.profile : {};
    user.colors = [
      { used: false, color: '#b71c1c' },
      { used: false, color: '#880e4f' },
      { used: false, color: '#4a148c' },
      { used: false, color: '#311b92' },
      { used: false, color: '#1a237e' },
      { used: false, color: '#0d47a1' },
      { used: false, color: '#01579b' },
      { used: false, color: '#006064' },
      { used: false, color: '#004d40' },
      { used: false, color: '#1b5e20' },
      { used: false, color: '#33691e' },
      { used: false, color: '#827717' },
      { used: false, color: '#f57f17' },
      { used: false, color: '#ff6f00' },
      { used: false, color: '#e65100' },
      { used: false, color: '#bf360c' },
      { used: false, color: '#3e2723' },
      { used: false, color: '#263238' }
    ];
    user.projects = [];

    // TODO: Use Object.assign in return

    return user;
  });
}
