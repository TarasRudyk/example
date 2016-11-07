import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import md5 from 'js-md5';

import { Accounts } from 'meteor/accounts-base';

const result = [];

if (!Meteor.users.find().count()) {
  HTTP.call('GET', Meteor.absoluteUrl('test-users.json'), {}, (err, response) => {
    if (response && response.data) {
      for (let i = 0; i < response.data.length; i += 1) {
        const user = Accounts.createUser({
          email: response.data[i].email,
          username: response.data[i].username,
          password: 'password',
          profile: {
            avatar: `https://www.gravatar.com/avatar/${md5(response.data[i].email)}`,
            fullname: response.data[i].fullname
          }
        });

        result.push(user);
      }
    }
  });
}
