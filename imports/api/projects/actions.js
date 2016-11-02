import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import formatValidation from 'string-format-validation';
import { addNotice } from '/imports/api/notices/actions';
import { getLocalState } from '/imports/startup/client/local-state';

export const createProject = (name, description) => {
  check(name, String);
  check(description, String);

  if (!formatValidation.validate({ min: 3, max: 25 }, name)) {
    addNotice(TAPi18n.__('Project name is required'));
    return false;
  }

  return Meteor.call('project.create', { name, description }, (err, res) => {
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

  return Meteor.call('project.edit', { name, description, projectId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go(`/project/${projectId}`);
    }
  });
};

export const deleteProject = (projectId) => {
  check(projectId, String);

  return Meteor.call('project.delete', { projectId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go('/projects');
    }
  });
};

export const next = () => {
  const params = getLocalState().get('params');
  if (params) {
    getLocalState().set('params', params + 7);
  } else {
    getLocalState().set('params', 7);
  }
};


export const previous = () => {
  const params = getLocalState().get('params');
  if (params) {
    getLocalState().set('params', params - 7);
  } else {
    getLocalState().set('params', 0);
  }
};
