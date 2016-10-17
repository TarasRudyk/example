import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React from 'react';

import MainLayout from '/imports/ui/containers/layouts/main';
import Home from '/imports/ui/containers/pages/home';
import Signin from '/imports/ui/pages/signin';
import Signup from '/imports/ui/pages/signup';
import UserInterface from '/imports/ui/pages/user-interface';

const checkLoggedIn = () => {
  if (!Meteor.userId()) {
    FlowRouter.go('/');
  }
};

const redirectIfUserLoggedIn = () => {
  if (Meteor.userId()) {
    FlowRouter.go('/');
  }
};

const privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [checkLoggedIn]
});

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: <Home />
    });
  }
});

privateRoutes.route('/user-interface', {
  action() {
    mount(MainLayout, {
      content: <UserInterface />
    });
  }
});

FlowRouter.route('/signin', {
  triggersEnter: redirectIfUserLoggedIn,
  action() {
    mount(MainLayout, {
      content: <Signin />
    });
  }
});

FlowRouter.route('/signup', {
  triggersEnter: redirectIfUserLoggedIn,
  action() {
    mount(MainLayout, {
      content: <Signup />
    });
  }
});

FlowRouter.route('/logout', {
  action() {
    Meteor.logout();
  }
});

Accounts.onLogin(() => FlowRouter.go('/'));
Accounts.onLogout(() => FlowRouter.go('/'));
