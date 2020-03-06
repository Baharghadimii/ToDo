import React, { useState } from 'react';
import CardList from '../card-list/CardList.js';
import axios from 'axios';
import { googleApi, yelpApi, ebayApi, omdbApi } from '../../api-keys';
import './Main.scss';

export default function Category(props) {
  const [state, setState] = useState({
    items: [],
    name: ''
  });
  const [group, setGroup] = useState('movie');
  const iconClick = (group) => {
    setGroup(group);
    resetAllBackgrounds();
    document.getElementById(group).style.backgroundColor = 'aliceblue';
  }
  const resetAllBackgrounds = () => {
    document.getElementById('movie').style.backgroundColor = 'transparent';
    document.getElementById('book').style.backgroundColor = 'transparent';
    document.getElementById('product').style.backgroundColor = 'transparent';
    document.getElementById('business').style.backgroundColor = 'transparent';
    document.getElementById('upcoming').style.backgroundColor = 'transparent';
    document.getElementById('favorite').style.backgroundColor = 'transparent';
  }
  const handleSearch = () => {
    if (state.name) {
      search(13);
    }
  }
  const search = (keyCode) => {
    if (keyCode === 13) {
      if (group === 'movie') {
        Promise.resolve(axios.get(`http://www.omdbapi.com/?apikey=${omdbApi}&t=${state.name}`))
          .then(res => {
            let plot = ``;
            const text = res.data.Plot;
            for (const char of text) {
              if (char === `'`) {
                plot += char + `'`;
              } else {
                plot += char;
              }
            }
            const temp = {
              category: 'movies',
              title: res.data.Title,
              year: res.data.Year,
              released: res.data.Released,
              duration: res.data.Runtime,
              genre: res.data.Genre,
              director: res.data.Director,
              writer: res.data.Writer,
              actors: res.data.Actors,
              plot: plot,
              awards: res.data.Awards,
              image: res.data.Poster,
              type: res.data.Type,
              link: '',
              production: res.data.Production,
              ratings: res.data.Ratings,
            }
            if (state.items) {
              axios.post(`http://localhost:3001/api/1/add/`, { temp })
                .then(res => {
                  props.reset();
                });
            }
          })
      }
    }
  };
  return (
    <div className="dashboard">
      <div className='menu'>
        <img className="icon" src="https://smarttodo.s3.ca-central-1.amazonaws.com/LogoMakr_3oDwIw.png" />
        <div id='divider'></div>
        <img
          id='movie'
          onClick={() => iconClick('movie')}
          src="https://smarttodo.s3.ca-central-1.amazonaws.com/clapperboard.png" />
        <img
          id='book'
          onClick={() => iconClick('book')}
          src='https://smarttodo.s3.ca-central-1.amazonaws.com/book.png' />
        <img
          id='product'
          onClick={() => iconClick('product')}
          src='https://smarttodo.s3.ca-central-1.amazonaws.com/product.png' />
        <img
          id='business'
          onClick={() => iconClick('business')}
          src="https://smarttodo.s3.ca-central-1.amazonaws.com/coffee-cup.png" />
        <img
          id='upcoming'
          onClick={() => iconClick('upcoming')}
          style={{ padding: '17%' }} src="https://smarttodo.s3.ca-central-1.amazonaws.com/next.png" />
        <img
          id='favorite'
          onClick={() => iconClick('favorite')}
          style={{ padding: '16%' }} src="https://smarttodo.s3.ca-central-1.amazonaws.com/star.png" />
      </div>
      <div className='list'>
        <div className="list-header">
          {group === 'movie' && < h1 > Movies List</h1>}
          {group === 'book' && < h1 > Books List</h1>}
          {group === 'product' && < h1 > Products List</h1>}
          {group === 'business' && < h1 > Restaurants List</h1>}
          {group === 'upcoming' && < h1 > Upcoming List</h1>}
          {group === 'favorite' && < h1 > favorite List</h1>}
          <div>
            <input
              type="text"
              onChange={e => setState({ ...state, name: e.target.value })}
              onKeyDown={e => search(e.keyCode)}
            ></input>
            <button onClick={handleSearch}>
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <CardList items={props.list} group={group} />
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
            <div className='dot'></div>
            <div className='desc'>
              <span>Movies to watch</span>
              <p>4</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot'></div>
            <div className='desc'>
              <span>Boos to read</span>
              <p>2</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot'></div>
            <div className='desc'>
              <span>Stuffs to buy</span>
              <p>1</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot'></div>
            <div className='desc'>
              <span>Places to go</span>
              <p>7</p>
            </div>
          </div>
        </div>
        <div className='edit'>
          <img id='signout' src="https://smarttodo.s3.ca-central-1.amazonaws.com/logout.png"></img>
          <i class="fa fa-edit"></i>
        </div>
      </div>
    </div >


  )
}