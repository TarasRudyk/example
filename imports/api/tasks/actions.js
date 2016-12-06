import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import formatValidation from 'string-format-validation';
import { addNotice } from '/imports/api/notices/actions';

export const createTask = ({ name, description, assignedTo, startAt }, projectId) => {
  check(name, String);
  check(description, String);
  check(assignedTo, String);
  check(startAt, Match.OneOf(null, Date));
  check(projectId, String);

  if (!formatValidation.validate({ min: 3, max: 25 }, name)) {
    addNotice(TAPi18n.__('Task name is required'));
    return false;
  }

  return Meteor.call('task.create', { name, description, assignedTo, startAt, projectId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }
    if (res) {
      FlowRouter.go(`/task/${res}`);
    }
  });
};

export const editTask = (task) => {
  check(task, {
    taskId: String,
    name: String,
    description: String,
    startAt: Match.OneOf(null, Date),
    assignedTo: String
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

export const removeTask = (taskId) => {
  check(taskId, String);

  return Meteor.call('task.remove', { taskId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }

    if (res) {
      FlowRouter.go(res);
    }
  });
};

export const acceptTask = (taskId, estimate, startAt) => {
  check(taskId, String);
  check(estimate, Number);
  check(startAt, Match.OneOf(undefined, null, Date));

  if (estimate < 15) {
    addNotice(TAPi18n.__('change.incorrectEstimate'));
    return false;
  }

  return Meteor.call('task.accept', { taskId, estimate, startAt }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }

    if (res) {
      addNotice(res);
    }
  });
};

export const reassignTask = (taskId, description, assignedTo) => {
  check(taskId, String);
  check(description, String);
  check(assignedTo, String);

  return Meteor.call('task.reassign', { taskId, description, assignedTo }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }

    if (res) {
      addNotice(res);
    }
  });
};
