import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import md5 from 'js-md5';

export const signin = (email, password, userInfo) => {
  check(email, ValidEmail);
  check(password, String);
  check(userInfo, Match.OneOf(Object, null));

  function isEmailValid(email) {
   let pattern =/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
   return pattern.test(email);
  }

  let loginError;

  if (!email) {
    return TAPi18n.__('auth.emailRequired');
  }

  if (!password) {
    return TAPi18n.__('auth.passwordRequired');
  }
  if (isEmailValid(email)) {
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
  }else{
    return TAPi18n.__('email dont match with requirment pattern')
    console.log("email dont match with requirment pattern")
  }
};

export const register = (email, password, isUsernameTaken) => {
  check(email, String);
  check(password, String);
  check(isUsernameTaken, Match.Optional(String));

  function isEmailValid(email) {
   let pattern =/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
   return pattern.test(email);
  }

  function isPasswordValid(password) {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return pattern.test(password)
  }

  if (isEmailValid(email) && isPasswordValid(password)) {
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
  }else{
    return TAPi18n.__('email or password dont match with pattern')
    console.log('email or password dont match with pattern')
  }
  if (!isUsernameTaken) {
    return TAPi18n.__('Please fill all fields.')
  }
  if (isUsernameTaken) {
    return TAPi18n.__('Username is already taken.')
  }
}

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
