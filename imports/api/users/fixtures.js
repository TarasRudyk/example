/* global Assets */

import { Meteor } from 'meteor/meteor';
import md5 from 'js-md5';

import { Accounts } from 'meteor/accounts-base';

const result = [];

if (!Meteor.users.find().count()) {
  const users = JSON.parse(Assets.getText('test-users.json'));

  users.map((user) => {
    const data = Accounts.createUser({
      email: user.email,
      username: user.username,
      password: 'password',
      profile: {
        avatar: `https://www.gravatar.com/avatar/${md5(user.email)}`,
        fullname: user.fullname
      }
    });

    result.push(data);

    return data;
  });
}
