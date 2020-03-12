import React, { useRef } from 'react';
import './CardListItem.scss';

export default function CardList(props) {
  const card = useRef();
  return (
    <div
      data-aos="fade-right"
      data-aos-delay={`${props.delay}`}
      ref={card} className="item-card" >
      <img
        alt="see more"
        src={props.item.image} />
      <div>
        <h1>{props.item.title}</h1>
        <p>{props.item.year}</p>
      </div>
      <button onClick={props.onClick}>
        <i class="fa fa-arrow-right"></i>
      </button>
    </div>

  )
}