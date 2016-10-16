import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';

import md5 from 'js-md5';
import formatValidation from 'string-format-validation';

export const signin = (email, password, userInfo) => {
  check(email, String);
  check(password, String);
  check(userInfo, Match.OneOf(Object, null));

  if (!email) {
    return TAPi18n.__('auth.emailRequired');
  }

  if (!password) {
    return TAPi18n.__('auth.passwordRequired');
  }

  if (formatValidation.validate({ type: 'email' }, email)) {
    return TAPi18n.__('auth.emailIncorrect');
  }

  Meteor.loginWithPassword(email, password, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (userInfo && userInfo.profile && userInfo.profile.username && userInfo.profile.fullName) {
        FlowRouter.go('/');
      } else {
        FlowRouter.go('/user-info');
      }
    }
  });
};

export const signup = (email, password) => {
  check(email, String);
  check(password, String);

  if (!email) {
    return TAPi18n.__('auth.emailRequired');
  }

  if (!password) {
    return TAPi18n.__('auth.passwordRequired');
  }

  if (formatValidation.validate({ type: 'email' }, email)) {
    return TAPi18n.__('auth.emailIncorrect');
  }

  if (formatValidation.validate({ min: 3, max: 25 }, password)) {
    return TAPi18n.__('auth.passwordIncorrect');
  }

  Accounts.createUser({
    email,
    password,
    profile: {
      avatar: `https://www.gravatar.com/avatar/${md5(email)}`
    }
  }, (err) => {
    if (err) {
      return err.reason;
    }
  });

  FlowRouter.go('/user-info');
};

export const saveData = (fullName, username) => {
  check(fullName, String);
  check(username, String);

  if (!fullName || !username) {
    return TAPi18n.__('Please fill all fields.')
  }

  Meteor.call('editUserData', {
    fullName: fullName,
    username: username
  }, (err) => {
    if (err) {
      return err.reason;
    } else {
      FlowRouter.go('/');
    }
  });
}

export const logout = () => {
  Meteor.logout()
};
