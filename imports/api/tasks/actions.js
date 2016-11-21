import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import formatValidation from 'string-format-validation';
import { addNotice } from '/imports/api/notices/actions';

export const createTask = ({ name, description, assignedAt, startAt }, projectId) => {
  check(name, String);
  check(description, String);
  check(assignedAt, String);
  check(startAt, Match.OneOf(null, Date));
  check(projectId, String);

  if (!formatValidation.validate({ min: 3, max: 25 }, name)) {
    addNotice(TAPi18n.__('Task name is required'));
    return false;
  }

  return Meteor.call('task.create', { name, description, assignedAt, startAt, projectId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go(`/project/${projectId}/task/${res}`);
    }
  });
};

export const editTask = (task) => {
  check(task, {
    taskId: String,
    name: String,
    description: String,
    startAt: Match.OneOf(null, Date),
    assignedAt: String
  });

  if (!formatValidation.validate({ min: 3, max: 25 }, task.name)) {
    addNotice(TAPi18n.__('Task name is required'));
    return false;
  }

  return Meteor.call('task.edit', task, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go(res);
    }
  });
};
