import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../documents';
import Files from '../files';

Meteor.publish('files.list', () => Files.find({}, { filePath: 0 }));

Meteor.publish('files.view', (_id) => {
  check(_id, String);
  return Files.find(_id);
});

Meteor.publish('documents.list', () => Documents.find());

Meteor.publish('documents.view', (_id) => {
  check(_id, String);
  return Documents.find(_id);
});
