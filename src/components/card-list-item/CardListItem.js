import React, { useRef, useEffect } from 'react';
import './CardListItem.scss';

export default function CardList(props) {
  const card = useRef();
  useEffect(() => {
    if (props.color === "blue") {
      card.current.style.borderLeft = '8px solid #3750b2'
    } else if (props.color === "red") {
      card.current.style.borderLeft = '8px solid #ff2d56'
    } else if (props.color === 'yellow') {
      card.current.style.borderLeft = '8px solid #FFBB00'
    } else {
      card.current.style.borderLeft = '8px solid rgb(180, 240, 243)'
    }
  }, []);
  console.log(props.item);
  return (
    <div
      data-aos="fade-right"
      data-aos-delay={`${props.delay}`}
      ref={card} className="item-card" >
      <img src={props.item.image} />
      <div>
        <h1>{props.item.title}</h1>
        <p>{props.item.year}</p>
      </div>
      <button>
        <i class="fa fa-arrow-right"></i>
      </button>
    </div>

  )
}