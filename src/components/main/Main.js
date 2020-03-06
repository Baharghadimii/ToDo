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
        <div className="list-header">
          <h1>Check List</h1>
          <div>
            <input type="text"></input>
            <button>
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <CardList />
      </div>
      <div className='profile'>
        <div className="header">
          <h1>Profile</h1>
          <i class="fa fa-bell"></i>
        </div>
        <img src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"></img>
        <h1>Mary Luis</h1>
        <div className="details">
          <div className="detail-main">
            <div className='dot blue'></div>
            <div className='desc'>
              <span>Movies to watch</span>
              <p>4</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot red'></div>
            <div className='desc'>
              <span>Movies to watch</span>
              <p>4</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot blue'></div>
            <div className='desc'>
              <span>Movies to watch</span>
              <p>4</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot red'></div>
            <div className='desc'>
              <span>Movies to watch</span>
              <p>4</p>
            </div>
          </div>
        </div>
        <div className='edit'>
          <img id='signout' src="https://smarttodo.s3.ca-central-1.amazonaws.com/logout.png"></img>
          <i class="fa fa-edit"></i>
        </div>
      </div>
    </div>


  )
}