import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Files from '../../api/documents/files';
import NotFound from './NotFound';
import container from '../../modules/container';

const ViewFile = ({ file }) => (file ? (
  <div className="EditDocument">
    <h4 className="page-header">
      <span className="padding-right">Store Number: { file.store }</span>
      <span className="padding-right">Scan Type: {file.scanType}</span>
      <span className="padding-right">Scan Date: {file.scanDate ? file.scanDate.toLocaleString() : ''}</span>
    </h4>
    <p>File Data/Path: {file.filePath}</p>
  </div>
) : <NotFound />);

ViewFile.propTypes = {
  file: PropTypes.object,
};

export default container((props, onData) => {
  const fileId = props.params._id;
  const subscription = Meteor.subscribe('files.view', fileId);

  if (subscription.ready()) {
    const file = Files.findOne(fileId);
    onData(null, { file });
  }
}, ViewFile);
