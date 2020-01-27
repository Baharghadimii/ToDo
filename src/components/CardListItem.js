import React from 'react'

export default function CardList(props) {
  console.log(props);
  return (
    <div style={{ margin: '0.5rem', width: '12rem', height: '18rem', backgroundImage: 'url(https://smarttodolist.s3.ca-central-1.amazonaws.com/backg.png)', backgroundColor: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px' }}>
      <img style={{ width: '6rem', height: '6rem', borderRadius: '50%', marginLeft: '2.7rem', marginTop: '1.5rem' }} variant="top" src={props.img} />
      <p style={{ fonstSize: '3rem', fontFamily: 'Nunito', marginLeft: '3rem', marginTop: '0.5rem' }}>
        {props.title}
        {/* <Button style={{ marginRight: '5%' }} variant="primary" href='#'>See More!</Button>
          <Button variant="primary"
            onClick={props.onDelete}>Delete</Button> */}
      </p>
    </div >
  )
}