import React, { useEffect, useState } from 'react';
import CardListItem from '../card-list-item/CardListItem';
import './CardList.scss';

export default function CardList(props) {
  const [itemList, setItemList] = useState([])
  useEffect(() => {
    if (props.items) {
      setItemList(props.items.value);
    }
  });
  return (
    <div className="card-list">
      {itemList.map((item, index) => {
        return <CardListItem color={'blue'} item={item} delay={index * 200} />
      })}
    </div>
  )
}
