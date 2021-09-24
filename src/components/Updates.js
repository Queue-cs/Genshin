import React, { memo } from 'react';

import Utils from '../Utils';
import changeLog from '../changeLog.json';
import { FlexboxGrid, Modal } from 'rsuite';

const Updates = ({ show, onHide }) => {
  let blocks = [];
  for (const key in changeLog) {
    if (Object.hasOwnProperty.call(changeLog, key)) {
      const value = changeLog[key];
      blocks.push(<FlexboxGrid className="row" key={"update" + key}>
        <FlexboxGrid.Item colspan={4}>{key}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20}>{Utils.Markdown(value)}</FlexboxGrid.Item>
      </FlexboxGrid>)
    }
  }
  return <Modal show={show} onHide={onHide} className="updates">
    <Modal.Header>
      <Modal.Title>Change log</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {blocks}
    </Modal.Body>
  </Modal>
}

export default Updates;