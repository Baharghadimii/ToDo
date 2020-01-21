import React from 'react'
import CardListItem from './CardListItem';
export default function CardList(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {props.list && props.list.map(item => {
        console.log(item)
        return <CardListItem img={item.img} title={item.title} content={item.content} link={item.link} />
      })}

    </div>
  )
}