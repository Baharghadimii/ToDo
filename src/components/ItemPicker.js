import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CheckboxList from './CheckboxList';

export default function ItemPicker(props) {
  const temp = [];
  const itemPick = (item) => {
    temp.push(item)
  }
  const save = () => {
    props.onAdd(temp)
  }
  return (
    <Modal.Dialog style={{ width: '90vw', maxWidth: '90vw' }}>
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
    </Modal.Dialog>
  )
}