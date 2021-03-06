import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { TAPi18n } from 'meteor/tap:i18n';

import { addNotice } from '/imports/api/notices/actions';

import md5 from 'js-md5';
import formatValidation from 'string-format-validation';

export const signin = (email, password) => {
  check(email, String);
  check(password, String);

  Meteor.loginWithPassword(email, password, (err) => {
    if (err) {
      addNotice(err.reason);
    }
  });
};

export const signup = (email, username, fullname, password) => {
  check(email, String);
  check(username, String);
  check(fullname, String);
  check(password, String);

  Accounts.createUser({
    email,
    username,
    password,
    profile: {
      avatar: `https://www.gravatar.com/avatar/${md5(email)}`,
      fullname
    }
  }, (err) => {
    if (err) {
      addNotice(err.reason);
    }
  });
};

export const changeEmail = (email = '') => {
  check(email, String);

  if (!email) {
    return false;
  }

  if (!formatValidation.validate({ type: 'email' }, email)) {
    addNotice(TAPi18n.__('auth.emailIncorrect'));
    return false;
  }

  return Meteor.call('user.changeEmail', { email }, (err) => {
    if (err) {
      addNotice(err.reason);
    } else {
      addNotice(TAPi18n.__('change.EmailChanged'));
    }
  });
};

export const changeFullname = (fullname = '') => {
  check(fullname, String);

  if (!fullname) {
    return false;
  }

  if (!formatValidation.validate({ min: 3, max: 25 }, fullname)) {
    addNotice(TAPi18n.__('auth.fullnameIncorrect'));
    return false;
  }

  return Meteor.call('user.changeFullname', { fullname }, (err) => {
    if (err) {
      addNotice(err.reason);
    } else {
      addNotice(TAPi18n.__('change.FullnameChanged'));
    }
  });
};

export const changePassword = (oldPass = '', newPass = '') => {
  check(oldPass, String);
  check(newPass, String);

  if (!oldPass && !newPass) {
    return false;
  }

  if (!formatValidation.validate({ min: 3, max: 25 }, newPass)) {
    addNotice(TAPi18n.__('change.NewPasswordIncorrect'));
    return false;
  }
  if (!formatValidation.validate({ min: 3, max: 25 }, oldPass)) {
    addNotice(TAPi18n.__('change.OldPasswordIncorrect'));
    return false;
  }

  return Accounts.changePassword(oldPass, newPass, (err) => {
    if (err) {
      addNotice(err.reason);
    } else {
      addNotice(TAPi18n.__('change.PasswordChanged'));
    }
  });
};

export const logout = () => {
  Meteor.logout();
};
