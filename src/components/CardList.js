import React, { useState, useEffect } from 'react'
import CardListItem from './CardListItem';
export default function CardList(props) {

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {props.list && props.list.map(item => {
        return <CardListItem
          img={item.image}
          title={item.title}
          content={item.content}
          link={item.link}
          onDelete={() => props.onDelete(item.item_id)} />
      })}
    </div>
  )
}