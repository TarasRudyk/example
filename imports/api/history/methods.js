import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { History } from './history';
import { isDockChanged, getViewText, getAdditionalData } from './utils';

export const logCreate = new ValidatedMethod({
  name: 'history.logCreate',
  validate: (new SimpleSchema({
    userId: { type: String },
    doc: { type: Object, blackbox: true },
    docType: { type: String }
  }).validator()),
  run({ userId, doc, docType }) {
    const docId = doc._id;
    delete doc._id;
    doc.id = docId;

    const user = Meteor.users.findOne({ _id: userId });

    Object.keys(doc).forEach((fieldKey) => {
      if (isDockChanged(fieldKey, docType)) {
        if (doc[fieldKey]) {
          const itemToInsert = {
            type: docType,
            date: new Date(),
            action: 'CREATE',
            currentState: doc,
            prevState: null,
            changedField: fieldKey,
            editor: {
              id: user._id,
              username: user.username,
              fullname: user.profile.fullname
            }
          };
          itemToInsert.view = getViewText(itemToInsert);

          History.insert(itemToInsert);
        }
      }
    });
  }
});

export const logEdit = new ValidatedMethod({
  name: 'history.logEdit',
  validate: (new SimpleSchema({
    userId: { type: String },
    doc: { type: Object, blackbox: true },
    prevDoc: { type: Object, blackbox: true },
    fieldNames: { type: [String] },
    docType: { type: String }
  }).validator()),
  run({ userId, doc, prevDoc, fieldNames, docType }) {
    const docId = doc._id;
    delete doc._id;
    doc.id = docId;

    const prevId = prevDoc._id;
    delete prevDoc._id;
    prevDoc.id = prevId;

    const user = Meteor.users.findOne({ _id: userId });

    fieldNames.forEach((fieldKey) => {
      if (isDockChanged(fieldKey, docType)) {
        if (doc[fieldKey] !== prevDoc[fieldKey]) {
          const itemToInsert = {
            type: docType,
            date: new Date(),
            action: 'EDIT',
            currentState: doc,
            prevState: prevDoc,
            changedField: fieldKey,
            editor: {
              id: user._id,
              username: user.username,
              fullname: user.profile.fullname
            }
          };
          itemToInsert.additional = getAdditionalData(itemToInsert);
          itemToInsert.view = getViewText(itemToInsert);

          History.insert(itemToInsert);
        }
      }
    });
  }
});

export const logDelete = new ValidatedMethod({
  name: 'history.logDelete',
  validate: (new SimpleSchema({
    userId: { type: String },
    doc: { type: Object, blackbox: true },
    docType: { type: String }
  }).validator()),
  run({ userId, doc, docType }) {
    const docId = doc._id;
    delete doc._id;
    doc.id = docId;

    const user = Meteor.users.findOne({ _id: userId });

    const itemToInsert = {
      type: docType,
      date: new Date(),
      action: 'DELETE',
      currentState: null,
      prevState: doc,
      changedField: null,
      editor: {
        id: user._id,
        username: user.username,
        fullname: user.profile.fullname
      }
    };
    itemToInsert.view = getViewText(itemToInsert);

    History.insert(itemToInsert);
  }
});
