import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
export default function CardList(props) {
  return (
    <div style={{ margin: '0.5rem' }}>
      <Card >
        <Card.Img style={{ width: '16rem', height: '20rem' }} variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.content}
          </Card.Text>
          <Button variant="primary" href={props.link}>See More!</Button>
        </Card.Body>
      </Card>
    </div>
  )
}