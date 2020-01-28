import React, { useState, useEffect } from 'react'
import CardListItem from './CardListItem';
export default function CardList(props) {

  return (
    <div style={{ width: '100%', display: 'flex', height: '18rem', flexDirection: 'row', overflow: 'auto' }}>
      {props.list && props.list.map(item => {
        return <CardListItem
          img={item.image}
          title={item.title}
          show={() => props.show(item)}
          onDelete={() => props.onDelete(item.item_id)} />
      })}
    </div>
  )
}