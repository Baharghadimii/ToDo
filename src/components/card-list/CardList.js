import React, { useEffect, useState } from 'react';
import CardListItem from '../card-list-item/CardListItem';
import './CardList.scss';

export default function CardList(props) {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    if (props.items) {
      if (props.items.value) {
        setItemList(props.items.value);
      } else {
        setItemList(props.items);
      }
    }
  }, [props.items]);
  console.log(props.items);
  return (
    <div className="card-list">
      {itemList.map((item, index) => {
        return <CardListItem
          color={'blue'}
          item={item}
          delay={index * 200}
          onClick={() => props.showItem(item)} />
      })}
    </div>
  )
}
