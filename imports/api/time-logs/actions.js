import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { addNotice } from '/imports/api/notices/actions';

export const createLog = (projectId, userId, taskId, startAt, endAt) => {
  check(projectId, String);
  check(userId, String);
  check(taskId, String);
  check(startAt, Date);
  check(endAt, Date);

  Meteor.call('timelog.create', { projectId, userId, taskId, startAt, endAt }, (err) => {
    if (err) {
      addNotice(err.error);
    }
  });
};

export const editLog = (id, startAt, andAt) => {
  check(id, String);
  check(startAt, Date);
  check(andAt, Date);

  Meteor.call('timelog.edit', { id, startAt, andAt }, (err) => {
    if (err) {
      addNotice(err.error);
    }
  });
};

export const removeLog = (id) => {
  check(id, String);

  Meteor.call('timelog.remove', { id }, (err) => {
    if (err) {
      addNotice(err.error);
    }
  });
};
