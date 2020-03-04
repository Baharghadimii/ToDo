import React from 'react';
import CardList from '../card-list/CardList';
import axios from 'axios';

export default function Category(props) {
  const deleteItem = (id) => {
    const userId = JSON.parse(localStorage.getItem('token')).session;

    axios.delete(`http://localhost:3001/api/${userId}/delete/${id}`)
      .then(res => {
        props.reset();
      });

  }
  return (
    <div>
      {props.list.map(item => {
        return (
          <div style={{ width: '100%', height: '20rem', marginTop: '1rem', backgroundColor: 'transparent' }}>
            <h4 style={{ fontFamily: 'Nunito', marginLeft: '1rem', marginTop: '1rem', color: '#f64c72' }}>{item.category}</h4>
            <div style={{ width: '10%', height: '2px', backgroundColor: '#f64c72', marginLeft: '1rem' }}></div>
            <CardList list={item.value} onDelete={deleteItem} show={props.show} />
          </div>)
      })}
    </div>


  )
}