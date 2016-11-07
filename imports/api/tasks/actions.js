import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import formatValidation from 'string-format-validation';
import { addNotice } from '/imports/api/notices/actions';

export const createTask = (name, description, projectId) => {
  check(name, String);
  check(description, String);

  if (!formatValidation.validate({ min: 3, max: 25 }, name)) {
    addNotice(TAPi18n.__('Project name is required'));
    return false;
  }

  return Meteor.call('task.create', { name, description, projectId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go(`/project/${projectId}/task/${res}`);
    }
  });
};
