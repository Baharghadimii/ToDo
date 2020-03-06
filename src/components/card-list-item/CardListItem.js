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
  }, [])
  return (
    <div data-aos="fade-right" ref={card} className="item-card" >
      <img src="https://images.pexels.com/photos/462030/pexels-photo-462030.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      <div>
        <h1>Matrix</h1>
        <p>1998</p>
      </div>
      <button>
        <i class="fa fa-arrow-right"></i>
      </button>
    </div>

  )
}