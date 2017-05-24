import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Files = new Mongo.Collection('Files');
export default Files;
//
// Files.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false,
// });
//
// Files.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true,
// });

Files.schema = new SimpleSchema({
  store: {
    type: Number,
    label: 'The title of the document.',
  },
  scanType: {
    type: String,
    label: 'type of scan',
  },
  scanDate: {
    type: Date,
    label: 'data of scan.',
  },
  filePath: {
    type: String,
    label: 'either file data or path to file',
    blackbox: true,
  },
});

Files.attachSchema(Files.schema);

Factory.define('document', Files, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
