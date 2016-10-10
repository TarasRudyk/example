import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React from 'react';

import MainLayout from '/imports/ui/layouts/main.jsx';
import Home from '/imports/ui/pages/home.jsx';
import Signin from '/imports/ui/pages/signin.jsx';
import Signup from '/imports/ui/pages/signup.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, { content: <Home /> });
  }
});

FlowRouter.route('/signin', {
  action() {
    mount(MainLayout, { content: <Signin /> });
  }
});

FlowRouter.route('/signup', {
  action() {
    mount(MainLayout, { content: <Signup /> });
  }
});

Accounts.onLogin(() => {
  FlowRouter.go('/');
});

Tracker.autorun(() => {
  if (!Meteor.userId()) {
    FlowRouter.go('/');
  }
});
