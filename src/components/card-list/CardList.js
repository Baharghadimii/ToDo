import React, { useEffect, useState } from 'react';
import CardListItem from '../card-list-item/CardListItem';
import './CardList.scss';

export default function CardList(props) {
  const [itemList, setItemList] = useState([])
  useEffect(() => {
    if (props.items) {
      props.items.forEach(item => setItemList(item.value));
    }
  });
  return (
    <div className="card-list">
      {itemList.map(item => {
        return <CardListItem color={'blue'} item={item} />
      })}
    </div>
  )
}
