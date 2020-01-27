import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

export default function CardList(props) {
  console.log(props);
  return (
    <div style={{ margin: '0.5rem', width: '15rem', height: '15rem' }}>
      <img style={{ width: '15rem', height: '10rem' }} variant="top" src={props.img} />
      <h1>
        Hello
          {/* <Button style={{ marginRight: '5%' }} variant="primary" href='#'>See More!</Button>
          <Button variant="primary"
            onClick={props.onDelete}>Delete</Button> */}
      </h1>
    </div >
  )
}