import React from 'react';
import CardListItem from '../card-list-item/CardListItem';
import './CardList.scss';

export default function CardList(props) {
  console.log(props.item);

  return (
    <div className="card-list">
      <CardListItem color={'blue'} item={props.item} />
    </div>
  )
}
