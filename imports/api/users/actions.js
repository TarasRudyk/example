import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { TAPi18n } from 'meteor/tap:i18n';

import { addNotification } from '/imports/api/notifications/actions';

import md5 from 'js-md5';
import formatValidation from 'string-format-validation';

export const signin = (email, password) => {
  check(email, String);
  check(password, String);

  if (!formatValidation.validate({ type: 'email' }, email)) {
    addNotification(TAPi18n.__('auth.emailIncorrect'));
    return false;
  }

  if (!formatValidation.validate({ min: 3, max: 25 }, password)) {
    addNotification(TAPi18n.__('auth.passwordIncorrect'));
    return false;
  }

  return Meteor.loginWithPassword(email, password, (err) => {
    if (err) {
      addNotification(err.reason);
      return false;
    }

    return true;
  });
};

export const signup = (email, username, fullname, password) => {
  check(email, String);
  check(username, String);
  check(fullname, String);
  check(password, String);

  if (!formatValidation.validate({ type: 'email' }, email)) {
    addNotification(TAPi18n.__('auth.emailIncorrect'));
    return false;
  }

  if (!formatValidation.validate({ min: 3, max: 25 }, username)) {
    addNotification(TAPi18n.__('auth.usernameIncorrect'));
    return false;
  }

  if (!formatValidation.validate({ min: 3, max: 25 }, fullname)) {
    addNotification(TAPi18n.__('auth.fullnameIncorrect'));
    return false;
  }

  if (!formatValidation.validate({ min: 3, max: 25 }, password)) {
    addNotification(TAPi18n.__('auth.passwordIncorrect'));
    return false;
  }

  return Accounts.createUser({
    email,
    username,
    password,
    profile: {
      avatar: `https://www.gravatar.com/avatar/${md5(email)}`,
      fullname
    }
  }, (err) => {
    if (err) {
      addNotification(err.reason);
      return false;
    }

    return true;
  });
};

export const logout = () => {
  Meteor.logout();
};
