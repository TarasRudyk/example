import { Meteor } from 'meteor/meteor';


// Dock change checks
export const isTaskChanged = (fieldKey) => {
  const watchedFields = [
    'name',
    'description',
    'startAt',
    'estimate',
    'isAccepted',
    'assignedAt'
  ];

  return watchedFields.indexOf(fieldKey) !== -1;
};

export const isDockChanged = (fieldKey, docType) => {
  switch (docType) {
    case 'task': return isTaskChanged(fieldKey);
    default: return false;
  }
};

// Item views constructors
export const getTaskViewText = (historyItem) => {
  const { action, currentState, prevState, changedField, editor, additional } = historyItem;

  if (action === 'CREATE' && changedField === 'name') {
    return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
    create task <a href="/project/${currentState.projectId}/task/${currentState.id}">
    ${currentState.name}</a>`;
  }

  if (action === 'DELETE') {
    return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
    delete task <a href="/project/${prevState.projectId}/task/${prevState.id}">
    ${prevState.name}</a>`;
  }

  switch (changedField) {
    case 'name': return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
      changed task title: ${prevState.name} to <a href="/project/${currentState.projectId}/task/${currentState.id}">
      ${currentState.name}</a>`;
    case 'description': return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
      changed description of task <a href="/project/${currentState.projectId}/task/${currentState.id}">
      ${currentState.name}</a>`;
    case 'startAt': return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
      change start date of task <a href="/project/${currentState.projectId}/task/${currentState.id}">
      ${currentState.name}</a>`;
    case 'estimate': return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
      change estimates of task <a href="/project/${currentState.projectId}/task/${currentState.id}">
      ${currentState.name}</a>`;
    case 'isAccepted': return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
      accept task <a href="/project/${currentState.projectId}/task/${currentState.id}">
      ${currentState.name}</a>`;
    case 'assignedAt': {
      if (currentState.assignedAt) {
        const assignedUserName =
          Meteor.users.findOne({ _id: currentState.assignedAt }).profile.fullname;

        const reason = additional.reason ? `Reason is : ${additional.reason}` : '';

        return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
          assign task <a href="/project/${currentState.projectId}/task/${currentState.id}">
          ${currentState.name}</a> at <a href="/profile/${currentState.assignedAt}">${assignedUserName}</a>.
           ${reason}`;
      }
      const assignedUserName =
        Meteor.users.findOne({ _id: prevState.assignedAt }).profile.fullname;
      return `<a href="/profile/${editor.id}">${editor.fullname}</a> 
        unassign task <a href="/project/${currentState.projectId}/task/${currentState.id}">
        ${currentState.name}</a> from <a href="/profile/${prevState.assignedAt}">${assignedUserName}</a>`;
    }
    default: return 'Unknown changes in the task';
  }
};

export const getViewText = (historyItem) => {
  switch (historyItem.type) {
    case 'task': return getTaskViewText(historyItem);
    default: return 'Some changes';
  }
};

// Additional data getters
export const getTaskAdditionalData = (historyItem) => {
  switch (historyItem.changedField) {
    case 'assignedAt': {
      const reason = historyItem.currentState.lastReassignReason;
      return {
        reason
      };
    }
    default: return null;
  }
};

export const getAdditionalData = (historyItem) => {
  switch (historyItem.type) {
    case 'task': return getTaskAdditionalData(historyItem);
    default: return null;
  }
};
