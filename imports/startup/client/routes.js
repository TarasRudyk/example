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
import ProjectEdit from '/imports/ui/containers/pages/project/edit';
import Elements from '/imports/ui/pages/elements';
import ProfileEdit from '/imports/ui/containers/pages/profile/profile-edit';
import Profile from '/imports/ui/containers/pages/profile/profile';
import CreateTask from '/imports/ui/containers/pages/project/tabs/tasks/create';
import Task from '/imports/ui/containers/pages/project/tabs/tasks/task';
import EditTask from '/imports/ui/containers/pages/project/tabs/tasks/edit';

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
  action(params, get) {
    mount(MainLayout, {
      content: <Home {...get} />
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
  action(params, get) {
    mount(MainLayout, {
      content: <Notifications {...get} />
    });
  }
});

privateRoutes.route('/projects', {
  action(params, get) {
    mount(MainLayout, {
      content: <Projects {...get} />
    });
  }
});

privateRoutes.route('/project/:point', {
  action({ point }) {
    if (point === 'create') {
      mount(MainLayout, {
        content: <ProjectCreate />
      });
    } else {
      mount(MainLayout, {
        content: <Project id={point} />
      });
    }
  }
});

privateRoutes.route('/project/edit/:id', {
  action(params) {
    mount(MainLayout, {
      content: <ProjectEdit {...params} />
    });
  }
});

privateRoutes.route('/project/:projectId/task/create', {
  action(params) {
    mount(MainLayout, {
      content: <CreateTask {...params} />
    });
  }
});

privateRoutes.route('/task/:taskId/edit', {
  action(params) {
    mount(MainLayout, {
      content: <EditTask {...params} />
    });
  }
});

privateRoutes.route('/task/:taskId', {
  action(params) {
    mount(MainLayout, {
      content: <Task {...params} />
    });
  }
});

privateRoutes.route('/profile', {
  action() {
    mount(MainLayout, {
      content: <Profile />
    });
  }
});

privateRoutes.route('/profile/edit', {
  action() {
    mount(MainLayout, {
      content: <ProfileEdit />
    });
  }
});

FlowRouter.route('/profile/:id', {
  action(params) {
    mount(MainLayout, {
      content: <Profile {...params} />
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
