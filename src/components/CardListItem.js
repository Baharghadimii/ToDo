import React from 'react'

export default function CardList(props) {
  console.log(props);
  return (
    <div style={{ textAlign: 'center', margin: '0.5rem', width: '10rem', height: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '10px' }}>
      <div style={{ width: '10rem', height: '5rem', backgroundColor: '#6E91F0', borderRadius: '10px' }}></div>
      <img style={{ width: '6rem', height: '7rem', borderRadius: '50%', marginTop: '-3rem' }} variant="top" src={props.img} />
      <p style={{ fonstSize: '1rem', fontFamily: 'Nunito', margin: '5px', marginTop: '0.5rem', color: 'black' }}>
        {props.title}
        {/* <Button style={{ marginRight: '5%' }} variant="primary" href='#'>See More!</Button>
          <Button variant="primary"
            onClick={props.onDelete}>Delete</Button> */}
      </p>
    </div >
  )
}