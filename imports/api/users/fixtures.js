/* global Assets */

import { Meteor } from 'meteor/meteor';
import md5 from 'js-md5';

import { Accounts } from 'meteor/accounts-base';

import { Colors } from '/imports/api/colors/colors';

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

if (Colors.find().count() === 0) {
  const colors = [
    '#1da9fc', '#fc363b', '#FFFC54', '#F77A52', '#9D397E',
    '#BEDB39', '#79BD8F', '#77fc75', '#1F8A70', '#911146',
    '#F29C9C', '#D8CAA8', '#ED8C2B', '#68FFDA', '#5E5A59',
    '#FF6F69', '#FFE11A', '#CC4452', '#77C4D3', '#7E8AA2'
  ];

  for (let i = 0; i < 20; i += 1) {
    for (let j = 0; j < 20; j += 1) {
      Colors.insert({ gradient: { start: colors[i], stop: colors[j], direction: 'horizontal' } });
      Colors.insert({ gradient: { start: colors[i], stop: colors[j], direction: 'vertical' } });
    }
  }
}
