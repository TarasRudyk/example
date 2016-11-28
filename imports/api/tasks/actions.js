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

export const deleteTask = (taskId) => {
  check(taskId, String);

  return Meteor.call('task.delete', { taskId }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }

    if (res) {
      FlowRouter.go(res);
    }
  });
};

export const acceptTask = (taskId, estimate) => {
  check(taskId, String);
  check(estimate, Number);

  if (estimate < 15) {
    addNotice(TAPi18n.__('change.incorrectEstimate'));
    return false;
  }

  return Meteor.call('task.accept', { taskId, estimate }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }

    if (res) {
      console.log('New task is accepted! Now you can see it at the dashboard.');
    }
  });
};

export const reassignTask = (taskId, description, assignAt) => {
  check(taskId, String);
  check(description, String);
  check(assignAt, String);

  return Meteor.call('task.reassign', { taskId, description, assignAt }, (err, res) => {
    if (err) {
      addNotice(err.error);
    }

    if (res) {
      addNotice(res);
    }
  });
};
