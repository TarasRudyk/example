import { Meteor } from 'meteor/meteor';

const onEditText = (newData, oldData, changedFields, editor) => {
  console.log(editor);
};

const onCreateText = (newData, editor) => {
  let text = `User <a href="${editor._id}">${editor.profile.fullname}</a> create new task: <a href="${newData._id}">${newData.name}</a>`;

  if (newData.assignedAt) {
    const assignedUser = Meteor.users.findOne({ _id: newData.assignedAt });
    text += `, and assign task at <a href="${assignedUser._id}">${assignedUser.profile.fullname}</a>.`;
  }

  return text;
};


export const getTaskText = (newData, action, oldData, changedFields, editor) => {
  switch (action) {
    case 'CREATE': return onCreateText(newData, editor);
    case 'EDIT': return onEditText(newData, oldData, changedFields, editor);
    case 'DELETE': return `User ${editor.fullname} delete task: ${newData.name}`;
    default: return '';
  }
};

