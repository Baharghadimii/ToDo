import React from 'react';
import CardList from '../card-list/CardList.js';
// import axios from 'axios';
import './Main.scss';

export default function Category(props) {
  // const deleteItem = (id) => {
  //   const userId = JSON.parse(localStorage.getItem('token')).session;

  //   axios.delete(`http://localhost:3001/api/${userId}/delete/${id}`)
  //     .then(res => {
  //       props.reset();
  //     });

  // }
  return (
    <div className="dashboard">
      <div className='menu'>
        <img className="icon" src="https://smarttodo.s3.ca-central-1.amazonaws.com/LogoMakr_3oDwIw.png" />
        <div id='divider'></div>
        <img src="https://smarttodo.s3.ca-central-1.amazonaws.com/clapperboard.png" />
        <img src='https://smarttodo.s3.ca-central-1.amazonaws.com/book.png' />
        <img src='https://smarttodo.s3.ca-central-1.amazonaws.com/product.png' />
        <img src="https://smarttodo.s3.ca-central-1.amazonaws.com/coffee-cup.png" />
        <img style={{ padding: '17%' }} src="https://smarttodo.s3.ca-central-1.amazonaws.com/next.png" />
        <img style={{ padding: '16%' }} src="https://smarttodo.s3.ca-central-1.amazonaws.com/star.png" />
      </div>
      <div className='list'>
        <div className="list-header"></div>
        <CardList />
      </div>
      <div className='profile'>
      </div>
    </div>


  )
}