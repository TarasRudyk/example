import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { addNotice } from '/imports/api/notices/actions';

export const createProject = (name, description) => {
  check(name, String);
  check(description, String);

  Meteor.call('project.create', { name, description }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go(`/project/${res}`);
    }
  });
};

export const editProject = (name, description, projectId) => {
  check(name, String);
  check(description, String);
  check(projectId, String);

  Meteor.call('project.edit', { name, description, projectId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go(`/project/${projectId}`);
    }
  });
};

export const removeProject = (projectId) => {
  check(projectId, String);

  Meteor.call('project.remove', { projectId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go('/projects');
    }
  });
};

export const removeUserFromProject = (projectId, userId) => {
  check(projectId, String);
  check(userId, String);

  return Meteor.call('project.removeUser', { projectId, userId }, (err) => {
    if (err) {
      addNotice(err.error);
    }
  });
};
