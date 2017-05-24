import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Files from '../../api/documents/files';
import container from '../../modules/container';

const handleNav = _id => browserHistory.push(`/file/${_id}`);

const FileList = ({ files }) => (
  files.length > 0 ? <ListGroup className="DocumentsList">
    {files.map(({ _id, store, scanType, scanDate, filePath }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        <div>{ `Store Number: ${store}, Scan Type: ${scanType}, Scan Date: ${scanDate}` }</div>
        <div>{`File Path: ${filePath}`}</div>
      </ListGroupItem>
    ))}
  </ListGroup> :
    <Alert bsStyle="warning">No documents yet.</Alert>
);

FileList.propTypes = {
  files: PropTypes.array,
};



export default container((props, onData) => {
  const subscription = Meteor.subscribe('files.list');
  if (subscription.ready()) {
    const files = Files.find().fetch();
    onData(null, { files });
  }
}, FileList);
