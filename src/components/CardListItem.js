import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

export default function CardList(props) {
  console.log(props);
  return (
    <div style={{ margin: '0.5rem' }}>
      <Card >
        <Card.Img style={{ width: '16rem', height: '20rem' }} variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.content}
          </Card.Text>
          <Button style={{ marginRight: '5%' }} variant="primary" href='#'>See More!</Button>
          <Button variant="primary"
            onClick={props.onDelete}>Delete</Button>
        </Card.Body>
      </Card>
    </div >
  )
}