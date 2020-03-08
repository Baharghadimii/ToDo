import React from 'react';
import { FaTimesCircle, FaLink, FaHeart, FaStar } from 'react-icons/fa';
import './ItemCard.scss';

export default function ItemCard(props) {
  const handleFavorite = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    token.favorites.push(props.item);
    localStorage.setItem('token', JSON.stringify(token));
  }
  return (
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="800"
      className="card-item-div">
      <img alt="thumbnail" src={props.item.image} style={{ borderRadius: '10px', backgroundColor: 'red', width: '20rem', height: '25rem', marginTop: '2.7rem', marginLeft: '1rem' }}></img>
      <div style={{ overflow: 'auto', width: '39rem', height: '100%' }}>
        <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', float: 'right', width: '3rem', height: '3rem', }} onClick={props.showList}>
          <FaTimesCircle size={35} color='#3750b2' />
        </button>
        <div className="desc-holder">
          <h4 style={{ marginTop: '2rem', marginLeft: '1rem' }}>{props.item.longTitle}</h4>
          {props.item.director && <h6 style={{ marginLeft: '1rem' }}><strong>Director: </strong>{props.item.director}</h6>}
          {props.item.actors && <h6 style={{ marginLeft: '1rem' }}><strong>Actors: </strong>{props.item.actors}</h6>}
          {props.item.duration && <h6 style={{ marginLeft: '1rem' }}><strong>Duration: </strong>{props.item.duration}</h6>}
          {props.item.genre && <h6 style={{ marginLeft: '1rem' }}><strong>Genre: </strong>{props.item.genre}</h6>}
          {props.item.ratings && <h6 style={{ marginLeft: '1rem' }}><strong>Ratings: </strong></h6>}
          {props.item.plot && <div style={{ width: '100%', height: '12rem', overflow: 'auto', marginRight: '1rem' }}>
            <p style={{ marginLeft: '1rem', marginRight: '3rem' }}><strong>Plot: </strong><br />{`"${props.item.plot}"`}</p>
          </div>}
          {props.item.author && <h6 style={{ marginLeft: '1rem' }}><strong>Authors: </strong>{props.item.author}</h6>}
          {props.item.published_date && <h6 style={{ marginLeft: '1rem' }}><strong>Published Date: </strong>{props.item.published_date}</h6>}
          {props.item.pages && <h6 style={{ marginLeft: '1rem' }}><strong>Pages: </strong>{props.item.pages}</h6>}
          {props.item.book_category && <h6 style={{ marginLeft: '1rem' }}><strong>Category: </strong>{props.item.book_category}</h6>}
          {props.item.description && <div style={{ width: '100%', height: '12rem', overflow: 'auto' }}>
            <p style={{ marginLeft: '1rem', marginRight: '3rem' }}><strong>Plot: </strong><br />{`"${props.item.description}"`}</p>
          </div>}
          {props.item.product_category && <h6 style={{ marginLeft: '1rem' }}><strong>Category: </strong>{props.item.product_category}</h6>}
          {props.item.country && <h6 style={{ marginLeft: '1rem' }}><strong>Country: </strong>{props.item.country}</h6>}
          {props.item.price && <h6 style={{ marginLeft: '1rem' }}><strong>Price: </strong>{props.item.price}</h6>}
          {props.item.product_category && <div style={{ width: '100%', height: '12rem', overflow: 'auto' }}>
            <p style={{ marginLeft: '1rem', marginRight: '3rem' }}><strong></strong><br /></p>
          </div>}
          {props.item.rating && <h6 style={{ marginLeft: '1rem' }}><strong>Ratings: </strong>{props.item.rating}</h6>}
          {props.item.location && <h6 style={{ marginLeft: '1rem' }}><strong>Location: </strong>{props.item.location}</h6>}
          {props.item.phone && <h6 style={{ marginLeft: '1rem' }}><strong>Phone: </strong>{props.item.phone}</h6>}
          {props.item.phone && <div style={{ width: '100%', height: '12rem', overflow: 'auto' }}>
            <p style={{ marginLeft: '1rem', marginRight: '3rem' }}><strong></strong><br /></p>
          </div>}
        </div>

        <FaLink style={{ float: 'right', marginRight: '2rem' }} size={25} color='#3750b2' onClick={() => window.open(props.item.link)} />
        <FaStar style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }} size={25} color='#3750b2' onClick={handleFavorite} />
      </div>
    </div>
  )
}