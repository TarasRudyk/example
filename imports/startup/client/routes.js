import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React from 'react';

import MainLayout from '/imports/ui/layouts/main.jsx';
import Home from '/imports/ui/containers/pages/home.js';
import Signin from '/imports/ui/containers/pages/signin.js';
import Signup from '/imports/ui/containers/pages/signup.js';
import UserInfo from '/imports/ui/containers/pages/user-info.js';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: <Home / >
    });
  }
});

FlowRouter.route('/signin', {
  action() {
    mount(MainLayout, {
      content: <Signin / >
    });
  }
});

FlowRouter.route('/signup', {
  action() {
    mount(MainLayout, {
      content: <Signup / >
    });
  }
});

FlowRouter.route('/logout', {
  action() {
    Meteor.logout();
  }
});

FlowRouter.route('/user-info', {
  action() {
    mount(MainLayout, {
      content: <UserInfo / >
    });
  }
});

Tracker.autorun(() => {
  if (!Meteor.userId()) {
    FlowRouter.go('/');
  }
});
