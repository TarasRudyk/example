import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { addNotice } from '/imports/api/notices/actions';

export const createLog = (projectId, taskId, startAt, endAt) => {
  check(projectId, String);
  check(taskId, String);
  check(startAt, Date);
  check(endAt, Date);

  Meteor.call('timelog.create', { projectId, taskId, startAt, endAt }, (err) => {
    if (err) {
      addNotice(err.error);
    }
  });
};

export const editLog = (id, startAt, endAt) => {
  check(id, String);
  check(startAt, Date);
  check(endAt, Date);

  Meteor.call('timelog.edit', { id, startAt, endAt }, (err) => {
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
