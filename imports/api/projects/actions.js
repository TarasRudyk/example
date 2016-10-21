import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import formatValidation from 'string-format-validation';

import { addNotification } from '/imports/api/notifications/actions';

export const createProject = (name, description) => {
  check(name, String);
  check(description, String);

  if (!formatValidation.validate({ min: 3, max: 25 }, name)) {
    addNotification(TAPi18n.__('Project name is required'));
    return false;
  }

  return Meteor.call('project.create', { name, description }, (err, res) => {
    if (err) {
      addNotification(err.error);
    }
    if (res) {
      FlowRouter.go(`/project/${res}`);
    }
  });
};
