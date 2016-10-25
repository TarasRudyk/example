import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React from 'react';

import MainLayout from '/imports/ui/containers/layouts/main';
import Home from '/imports/ui/containers/pages/home';
import Signin from '/imports/ui/pages/signin';
import Signup from '/imports/ui/pages/signup';
import Notifications from '/imports/ui/containers/pages/notifications/list';
import Project from '/imports/ui/containers/pages/project/project';
import Projects from '/imports/ui/containers/pages/projects/list';
import ProjectCreate from '/imports/ui/containers/pages/project/create';
import Elements from '/imports/ui/pages/elements';

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

privateRoutes.route('/elements', {
  action() {
    mount(MainLayout, {
      content: <Elements />
    });
  }
});

privateRoutes.route('/notifications', {
  action() {
    mount(MainLayout, {
      content: <Notifications />
    });
  }
});

privateRoutes.route('/projects', {
  action() {
    mount(MainLayout, {
      content: <Projects />
    });
  }
});

privateRoutes.route('/projects/create', {
  action() {
    mount(MainLayout, {
      content: <ProjectCreate />
    });
  }
});

privateRoutes.route('/project/:id', {
  action(params) {
    mount(MainLayout, {
      content: <Project {...params} />
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

Accounts.onLogin(() => {
  const path = FlowRouter.current().path;

  if (path === '/signin' || path === '/signup') {
    FlowRouter.go('/');
    return;
  }

  FlowRouter.go(path);
});
Accounts.onLogout(() => FlowRouter.go('/'));
