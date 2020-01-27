import React, { useEffect } from 'react';
import './NavBar.scss';
import axios from "axios";
import { FaCaretDown } from 'react-icons/fa'
import { googleApi, yelpApi, ebayApi, omdbApi } from '../api-keys';

export default function NavBar(props) {
  const [item, setItem] = React.useState('');
  const [searchBar, setSearchBar] = React.useState();

  const search = (searchedItem) => {
    setItem('');
    const chosenOption = document.getElementsByName('options')[0];
    const userId = JSON.parse(localStorage.getItem('token')).session;
    if (chosenOption.options[0].selected) {
      Promise.resolve(axios.get(`http://www.omdbapi.com/?apikey=${omdbApi}&t=${searchedItem}`))
        .then(res => {
          console.log(res);
          const item = {
            category: 'movies',
            title: res.data.Title,
            year: res.data.Year,
            released: res.data.Released,
            duration: res.data.Runtime,
            genre: res.data.Genre,
            director: res.data.Director,
            writer: res.data.Writer,
            actors: res.data.Actors,
            plot: res.data.Plot,
            awards: res.data.Awards,
            image: res.data.Poster,
            type: res.data.Type,
            link: '',
            production: res.data.Production,
            ratings: res.data.Ratings,
          }
          axios.post(`http://localhost:3001/api/${userId}/add/`, { item })
            .then(res => {
              props.reset();
            });
        })
    } else if (chosenOption.options[1].selected) {
      Promise.resolve(axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedItem}&key=${googleApi}`))
        .then(res => {
          const items = res.data.items;
          const item = {};
          for (let i = 0; i < 5; i++) {
            const capitalItem = searchedItem.charAt(0).toUpperCase() + searchedItem.slice(1, searchedItem.length);
            if (items[i].volumeInfo.title === searchedItem || items[i].volumeInfo.title === capitalItem) {
              item.category = 'books';
              item.title = res.data.items[i].volumeInfo.title;
              item.subtitle = res.data.items[i].volumeInfo.subtitle;
              item.author = res.data.items[i].volumeInfo.authors[0];
              item.publishedDate = res.data.items[i].volumeInfo.publishedDate;
              item.description = res.data.items[i].volumeInfo.description;
              item.pages = res.data.items[i].volumeInfo.pageCount;
              item.bookCategory = res.data.items[i].volumeInfo.categories[0];
              item.link = res.data.items[i].volumeInfo.previewLink;
              item.image = res.data.items[i].volumeInfo.imageLinks || '';
            }
          }
          axios.post(`http://localhost:3001/api/${userId}/add/`, { item })
            .then(res => {
              props.reset();
            });
        });
    } else if (chosenOption.options[2].selected) {
      Promise.resolve(axios.get(`https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&keywords=${searchedItem}&RESPONSE-DATA-FORMAT=JSON&SECURITY-APPNAME=${ebayApi}`))
        .then(res => {
          const product = res.data.findItemsByKeywordsResponse[0].searchResult[0].item[0];
          const item = {
            category: 'products',
            title: product.title[0],
            subtitle: product.subtitle[0],
            productCategory: product.primaryCategory[0].categoryName[0],
            image: product.galleryURL[0],
            country: product.country[0],
            link: product.viewItemURL[0],
            price: product.sellingStatus[0].currentPrice[0].__value__
          }
          axios.post(`http://localhost:3001/api/${userId}/add/`, { item })
            .then(res => {
              props.reset();
            });
        })
    } else {
      Promise.resolve(axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization: `Bearer ${yelpApi}`,
        },
        params: {
          location: 'vancouver',
          term: searchedItem,
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
        axios.post(`http://localhost:3001/api/${userId}/add/`, { item })
          .then(res => {
            props.reset();
          });
      })
    }
  }

  useEffect(() => {
    setSearchBar(localStorage.getItem('token') ? true : false)

  })
  const logOut = () => {
    localStorage.clear();
    props.reset()
  }
  const click = () => {
    const searchBtn = document.getElementById("search-btn");
    const input = document.getElementById("search-input");
    const drop = document.getElementById('hide')
    searchBtn.classList.toggle("close");
    input.classList.toggle("square");
    drop.classList.toggle('togg');
  }

  return (
    <div class="navBar" style={{ width: '100%', height: '3.5rem', backgroundColor: '#eae7dc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
      {searchBar && <div style={{ float: 'left', width: '5rem' }}>
        <form onSubmit={() => search(item)} id="content">
          <input
            value={item}
            type="text"
            name="input"
            class="input"
            id="search-input"
            onChange={(event) => setItem(event.target.value)} />
          <button type="reset" class="search" id="search-btn" onClick={click}></button>
        </form>
        <select id='hide' className="show" name="options">
          <option style={{ fontSize: '5px' }} value="movies">Movies</option>
          <option style={{ fontSize: '5px' }} value="movies">Books</option>
          <option style={{ fontSize: '5px' }} value="movies">Products</option>
          <option style={{ fontSize: '5px' }} value="movies">Restaurants</option>
          <FaCaretDown />
        </select>
      </div>}
      <h1 href="#home" style={{ color: '#e85a4f', fontFamily: 'Nunito', fontWeight: '900', fontSize: '1.5rem', marginTop: '0.75rem' }}>Smart ToDo</h1>
      <button className='logout-btn' style={{ width: '4rem', height: '2rem', background: 'transparent', border: '0.5px solid #e85a4f', borderRadius: '5px', color: '#e85a4f', marginRight: '2rem', marginTop: '0.7rem', cursor: 'pointer' }} onClick={logOut} href="/home">Logout</button>
    </div >
  )
}