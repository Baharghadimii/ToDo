import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

export default function ItemCard(props) {
  console.log(props.item)
  return (
    <div style={{ display: "flex", flexDirection: 'row', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', borderRadius: '10px', width: '60rem', height: '30rem', margin: '0 auto', marginTop: '2rem', backgroundColor: '#F8F9F9' }}>
      <img src={props.item.image} style={{ borderRadius: '10px', backgroundColor: 'red', width: '20rem', height: '25rem', marginTop: '2.7rem', marginLeft: '1rem' }}></img>
      <div style={{ overflow: 'auto', width: '39rem', height: '100%' }}>
        <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', float: 'right', width: '3rem', height: '3rem', }} onClick={props.showList}>
          <FaTimesCircle size={35} />
        </button>
        <h3 style={{ marginTop: '3.5rem', marginLeft: '1rem' }}>{props.item.longTitle}</h3>
        {props.item.director && <h6 style={{ marginLeft: '1rem' }}><strong>Director: </strong>{props.item.director}</h6>}
        {props.item.actors && <h6 style={{ marginLeft: '1rem' }}><strong>Actors: </strong>{props.item.actors}</h6>}
        {props.item.duration && <h6 style={{ marginLeft: '1rem' }}><strong>Duration: </strong>{props.item.duration}</h6>}
        {props.item.genre && <h6 style={{ marginLeft: '1rem' }}><strong>Genre: </strong>{props.item.genre}</h6>}
        {props.item.ratings && <h6 style={{ marginLeft: '1rem' }}><strong>Ratings: </strong></h6>}
        {props.item.plot && <div style={{ width: '100%', height: '10rem' }}>
          <p style={{ marginLeft: '1rem' }}><strong>Plot: </strong><br />{`"${props.item.plot}"`}</p>
        </div>}
        {props.item.author && <h6 style={{ marginLeft: '1rem' }}><strong>Authors: </strong>{props.item.author}</h6>}
        {/* {props.item.actors && <h6 style={{ marginLeft: '1rem' }}><strong>Actors: </strong>{props.item.actors}</h6>}
        {props.item.duration && <h6 style={{ marginLeft: '1rem' }}><strong>Duration: </strong>{props.item.duration}</h6>}
        {props.item.genre && <h6 style={{ marginLeft: '1rem' }}><strong>Genre: </strong>{props.item.genre}</h6>}
        {props.item.ratings && <h6 style={{ marginLeft: '1rem' }}><strong>Ratings: </strong></h6>}
        {props.item.plot && <div style={{ width: '100%', height: '10rem' }}>
          <p style={{ marginLeft: '1rem' }}><strong>Plot: </strong><br />{`"${props.item.plot}"`}</p>
        </div>} */}
        <FaLink style={{ float: 'right', marginRight: '2rem' }} size={25} />
        <FaHeart style={{ float: 'right', marginRight: '1rem' }} size={25} />
        <FaStar style={{ float: 'right', marginRight: '1rem' }} size={25} />

      </div>
    </div>
  )
}