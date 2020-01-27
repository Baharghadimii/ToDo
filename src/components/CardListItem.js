import React, { useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

export default function CardList(props) {
  return (

    <div style={{ displey: 'flex', flexDirection: 'column', textAlign: 'center', margin: '0.5rem', width: '10rem', height: '15rem', marginTop: '1rem', backgroundColor: '#F8F9F9', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', borderRadius: '10px' }}>
      <div style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', width: '10rem', height: '5rem', backgroundColor: '#2f2fa2', borderRadius: '10px 10px 35px 35px' }}></div>
      <img style={{ width: '6rem', height: '7rem', borderRadius: '50%', marginTop: '-3rem' }} variant="top" src={props.img} />
      <p style={{ fonstSize: '1rem', fontFamily: 'Nunito', margin: '5px', marginTop: '0.5rem', color: 'black' }}>
        {props.title}

      </p>
      <div style={{ marginTop: '1rem' }}>
        <button style={{ outline: 'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', float: "left", marginLeft: '1rem', borderRadius: '50%' }} variant="primary"
          onClick={props.onDelete}>
          <FaTrashAlt />
        </button>
        <button onClick={props.show} style={{ outline: 'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', float: "right", marginRight: '1rem', borderRadius: '50%', backgroundColor: '#2f2fa2' }} variant="primary" href='#'>
          <FaAngleDoubleRight style={{ color: 'white', border: 'none' }} />
        </button>
      </div>

    </div>

  )
}