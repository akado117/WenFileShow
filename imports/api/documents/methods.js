import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from './documents';
import Files from './files';
import rateLimit from '../../modules/rate-limit.js';

//
// Files.schema = new SimpleSchema({
//   store: {
//     type: Number,
//     label: 'The title of the document.',
//   },
//   scanType: {
//     type: String,
//     label: 'type of scan',
//   },
//   scanDate: {
//     type: Date,
//     label: 'data of scan.',
//   },
//   filePath: {
//     type: Object,
//     label: 'either file data or path to file',
//     blackbox: true,
//   },
// });
export const upsertFile = new ValidatedMethod({
  name: 'files.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    store: { type: Number, optional: false },
    scanType: { type: String, optional: false },
    scanDate: { type: Date, optional: false },
    filePath: { type: String, optional: true },
  }).validator(),
  run(file) {
    return Files.upsert({ _id: file._id }, { $set: file });
  },
});

export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(document) {
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
