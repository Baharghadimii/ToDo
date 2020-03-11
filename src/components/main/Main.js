import React, { useState, useEffect } from 'react';
import CardList from '../card-list/CardList.js';
import axios from 'axios';
import { googleApi, yelpApi, ebayApi, omdbApi } from '../../api-keys';
import './Main.scss';
import { element } from 'prop-types';

export default function Category(props) {
  const [state, setState] = useState({
    name: ''
  });
  const [itemList, setItemList] = useState({
    movies: [],
    books: [],
    products: [],
    businesses: []
  })
  const [counts, setCounts] = useState({
    movies: 0,
    books: 0,
    products: 0,
    businesses: 0
  })
  let favorites = []
  useEffect(() => {
    setTimeout(() => {
      setCounts({
        movies: props.list[0] ? props.list[0].value.length : 0,
        books: props.list[1] ? props.list[1].value.length : 0,
        products: props.list[2] ? props.list[2].value.length : 0,
        businesses: props.list[3] ? props.list[3].value.length : 0,
      })
    }, 500);
    favorites = props.list.filter(item => {
      const favoriteItems = [];
      item.value.forEach(element => {
        if (element.favorite) {
          favoriteItems.push(element);
        }
      });
      if (favoriteItems.length > 0) {
        return favoriteItems;
      }
    });
    console.log('favorites:', favorites)
  }, []);
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
            if (res.data) {
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
              axios.post(`http://localhost:3001/api/1/add/`, { temp })
                .then(res => {
                  props.reset();
                });
            }
          }).catch(err => console.log(err))
      } else if (group === 'book') {
        Promise.resolve(axios.get(`https://www.googleapis.com/books/v1/volumes?q=${state.name}&key=${googleApi}`))
          .then(res => {
            const item = {};
            let plot = ``;
            const text = res.data.items[1].volumeInfo.description;
            for (const char of text) {
              if (char === `'`) {
                plot += char + `'`;
              } else {
                plot += char;
              }
            }
            item.category = 'books';
            item.title = res.data.items[1].volumeInfo.title;
            item.subtitle = res.data.items[1].volumeInfo.subtitle;
            item.author = res.data.items[1].volumeInfo.authors[0];
            item.publishedDate = res.data.items[1].volumeInfo.publishedDate;
            item.description = plot;
            item.pages = res.data.items[1].volumeInfo.pageCount;
            item.bookCategory = res.data.items[1].volumeInfo.categories[0];
            item.link = res.data.items[1].volumeInfo.previewLink;
            item.image = res.data.items[1].volumeInfo.imageLinks || '';
            console.log(item);

            axios.post(`http://localhost:3001/api/1/add/`, { item })
              .then(res => {
                if (res) {
                  props.reset();
                }
              });
          });
      } else if (group === 'product') {
        Promise.resolve(axios.get(`https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&keywords=${state.name}&RESPONSE-DATA-FORMAT=JSON&SECURITY-APPNAME=${ebayApi}`))
          .then(res => {
            const product = res.data.findItemsByKeywordsResponse[0].searchResult[0].item[0];
            let title = ``;
            const text = product.title[0];
            for (const char of text) {
              if (char === `'`) {
                title += char + `'`;
              } else {
                title += char;
              }
            }
            product.title[0].replace(`'`, '');
            const item = {
              category: 'products',
              title: title,
              productCategory: product.primaryCategory[0].categoryName[0],
              image: product.galleryURL[0],
              country: product.country[0],
              link: product.viewItemURL[0],
              price: product.sellingStatus[0].currentPrice[0].__value__
            }
            axios.post(`http://localhost:3001/api/1/add/`, { item })
              .then(res => {
                console.log(res)
                if (res) {
                  props.reset();
                }
              });
          })
      } else {
        Promise.resolve(axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
          headers: {
            Authorization: `Bearer ${yelpApi}`,
          },
          params: {
            location: 'vancouver',
            term: state.name,
          }
        })).then(res => {
          const business = res.data.businesses[0];
          const item = {
            category: 'restaurants',
            name: business.name,
            reviewCount: business.review_count,
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.latitude,
            rating: business.rating,
            price: business.price,
            phone: business.display_phone,
            location: business.location.address1,
            image: business.image_url,
            link: business.url,
          }
          axios.post(`http://localhost:3001/api/1/add/`, { item })
            .then(res => {
              props.reset();
            });
        })
      }
    }
  };
  const showItem = (item) => {
    props.showItem(item);
  }
  const logout = () => {
    localStorage.clear();
    props.reset();
  }
  console.log(itemList);
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
          {group === 'favorite' && < h1 > Favorite List</h1>}
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
        {group === 'movie' && <CardList items={props.list[0]} group={group}
          showItem={showItem} />}
        {group === 'book' && <CardList items={props.list[1]} group={group}
          showItem={showItem} />}
        {group === 'product' && <CardList items={props.list[2]} group={group}
          showItem={showItem} />}
        {group === 'business' && <CardList items={props.list[3]} group={group}
          showItem={showItem} />}
        {group === 'favorite' && <CardList items={favorites} group={group}
          showItem={showItem} />}
      </div>
      <div className='profile'>
        <div className="header">
          <h1>Profile</h1>
          <i class="fa fa-edit"></i>
        </div>
        <img src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"></img>
        <h1>Mary Luis</h1>
        <div className="details">
          <div className="detail-main">
            <div className='dot'></div>
            <div className='desc'>
              <span>Movies to watch</span>
              <p>{counts.movies}</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot'></div>
            <div className='desc'>
              <span>Boos to read</span>
              <p>{counts.books}</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot'></div>
            <div className='desc'>
              <span>Stuffs to buy</span>
              <p>{counts.products}</p>
            </div>
          </div>
          <div className="detail-main">
            <div className='dot'></div>
            <div className='desc'>
              <span>Places to go</span>
              <p>{counts.businesses}</p>
            </div>
          </div>
        </div>
        <div className='edit'>
          <img
            id='signout'
            src="https://smarttodo.s3.ca-central-1.amazonaws.com/logout.png"
            onClick={logout}></img>
        </div>
      </div>
    </div >


  )
}