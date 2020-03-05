import React from 'react';
// import CardList from '../card-list/CardList';
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
        <img src="https://smarttodo.s3.ca-central-1.amazonaws.com/LogoMakr_3oDwIw.png" />
        <i class="fa fa-film"></i>
        <img className='icon' src='https://smarttodo.s3.ca-central-1.amazonaws.com/book.png' />
        <img className='icon' src='https://smarttodo.s3.ca-central-1.amazonaws.com/product.png' />
        <img className="icon" src="https://smarttodo.s3.ca-central-1.amazonaws.com/coffee-cup.png" />
      </div>
      <div className='list'>
      </div>
      <div className='profile'>
      </div>
    </div>


  )
}