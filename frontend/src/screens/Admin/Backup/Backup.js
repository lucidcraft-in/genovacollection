import React from 'react';
import Sidebar from '../Sidebar';
import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';

export default function Backup() {
  const backupCollections = async () => {
    const res = window.confirm('Are you sure want to backup!');

    if (res) {
      try {
        const response = await axios.get('/api/backup');
        const backupData = response.data;

        const jsonString = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        saveAs(blob, 'data.json');
        // Do something with the backupData, e.g., save it to a file or display it in the UI
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    }
  };
  return (
    <div>
      {' '}
      <Sidebar />{' '}
      <div className="main">
        {' '}
        <>
          {' '}
          <Row className="align-items-center">
            <Col>
              <span className="header">Backup</span>
            </Col>
            <Col className="text-right">
              <Button className="my-3" onClick={backupCollections}>
                <i className="fas fa-plus"></i> Backup
              </Button>
            </Col>
          </Row>
        </>
      </div>
    </div>
  );
}
