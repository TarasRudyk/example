import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import md5 from 'js-md5';

export const signin = (email, password, userInfo) => {
  check(email, String);
  check(password, String);
  check(userInfo, Match.OneOf(Object, null));

  let loginError;

  if (!email) {
    return TAPi18n.__('auth.emailRequired');
  }

  if (!password) {
    return TAPi18n.__('auth.passwordRequired');
  }

  Meteor.loginWithPassword(email, password, (err) => {
    if (err) {
      return err.reason;
    } else {
      if (userInfo && userInfo.profile && userInfo.profile.username && userInfo.profile.fullName) {
        FlowRouter.go('/');
      } else {
        FlowRouter.go('/user-info');
      }
    }
  });
};

export const register = (email, password, isUsernameTaken) => {
  check(email, String);
  check(password, String);
  check(isUsernameTaken, Match.Optional(String));

  if (email && password) {
    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        avatar: `https://www.gravatar.com/avatar/${md5(email)}`
      }
    }, (err) => {
      if (err) {
        return err.reason;
      } else {
        FlowRouter.go('/user-info');
      }
    });
  } else if (!isUsernameTaken) {
      return TAPi18n.__('Please fill all fields.');
  } else if (isUsernameTaken) {
      return TAPi18n.__('Username is already taken.');
  }
}

export const logout = () => {
  Meteor.logout()
};
