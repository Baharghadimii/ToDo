import React from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'

export default function CheckBoxListItem(props) {

  return (
    <Form onChange={props.onChange}>
      <div style={{ display: 'flex', flexDirection: "row" }} className="mb-3">
        <Form.Check
          type={'checkbox'}
          id={props.listItem.id}
        />
        <Image style={{ width: '2rem', height: '2rem', marginLeft: '0.5rem' }} src={props.listItem.img} roundedCircle />
        <p style={{ fontSize: '15px', marginLeft: '0.5rem' }}>{props.listItem.title}</p>
      </div>
    </Form>
  )
}