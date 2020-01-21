import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CheckboxList from './CheckboxList';
import ProgressBar from 'react-bootstrap/ProgressBar'
export default function ItemPicker(props) {
  const temp = [];
  const [progress, setProgress] = useState(0);
  const [list, showList] = useState(false);
  const itemPick = (item) => {
    temp.push(item)
  }
  const save = () => {
    props.onAdd(temp)
  }
  useEffect(() => {
    setTimeout(() => {
      setProgress(50);
    }, 1000);
    setTimeout(() => {
      setProgress(100);
    }, 1500);
    setTimeout(() => {
      showList(true)
    }, 2000)
  })
  return (
    <Modal.Dialog style={{ width: '90vw', maxWidth: '90vw' }}>

      {!list && <ProgressBar animated now={progress} />}
      {list && (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Check items you desire to add.</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ display: 'flex', flexDirection: 'row' }}>
            <CheckboxList list={props.list} onChange={itemPick} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary" onClick={save}>Add Items</Button>
          </Modal.Footer>
        </div>
      )}

    </Modal.Dialog>
  )
}