import React from 'react';
import CardListItem from '../card-list-item/CardListItem';
import './CardList.scss';

export default function CardList() {
  return (
    <div className="card-list">
      <CardListItem color={'blue'} />
      <CardListItem color={'red'} />
      <CardListItem color={'yellow'} />
      <CardListItem color={'green'} />
    </div>
  )
}
