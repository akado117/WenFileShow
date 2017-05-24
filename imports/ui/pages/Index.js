import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import FileList from '../components/FileList.jsx';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Ride Bicycles</h2>
      <p>Gathering data on network security made easy</p>
      <p style={ { fontSize: '16px', color: '#aaa' } }>Currently... a work in progress</p>
    </Jumbotron>
    <FileList/>
  </div>
);

export default Index;
