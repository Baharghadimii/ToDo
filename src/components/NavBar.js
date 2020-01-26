import React, { useEffect } from 'react';
import './NavBar.scss';
import axios from "axios";
import { FaCaretDown } from 'react-icons/fa'
import Modal from './ItemPicker';
import { googleApi, yelpApi, etsyApi, omdbApi } from '../api-keys';


export default function NavBar(props) {
  const [state, setState] = React.useState({
    rowOne: [],
    rowTwo: [],
    rowThree: [],
    rowFour: []
  });
  const [noData, setNoData] = React.useState(false);
  const [item, setItem] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [searchBar, setSearchBar] = React.useState();

  const search = (item) => {
    setItem('');
    const chosenOption = document.getElementsByName('options');
    console.log(chosenOption);
    Promise.all([
      Promise.resolve(axios.get(`https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&keywords=pants&RESPONSE-DATA-FORMAT=JSON&SECURITY-APPNAME=BaharehG-smartToD-PRD-fce6fb270-d459fe1a`)),
      Promise.resolve(axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization: `Bearer ${yelpApi}`,
        },
        params: {
          location: 'vancouver',
          term: item,
        }
      })),
      Promise.resolve(axios.get(`http://www.omdbapi.com/?apikey=${omdbApi}&s=${item}`)),
      Promise.resolve(axios.get(`https://www.googleapis.com/books/v1/volumes?q=${item}&key=${googleApi}`))
    ]).then(all => {
    })
  }
  const add = (item) => {
    const userId = JSON.parse(localStorage.getItem('token')).session;
    axios.post(`http://localhost:3001/api/${userId}/add/`, { item })
      .then(res => {

      });
    props.reset();
    // setModal(false);
    // props.showList(item);
  }
  const close = () => {
    setModal(false)
    props.reset();
  }
  useEffect(() => {
    setSearchBar(localStorage.getItem('token') ? true : false)

  })
  const logOut = () => {
    localStorage.clear();
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
          <option value="movies">Movies</option>
          <option value="movies">Books</option>
          <option value="movies">products</option>
          <option value="movies">restaurants</option>
          <FaCaretDown />
        </select>
      </div>}
      {/* {modal && <Modal list={state} onAdd={add} onClose={close} noData={noData} />} */}
      <h1 href="#home" style={{ color: '#e85a4f', fontFamily: 'Nunito', fontWeight: '900', fontSize: '1.5rem', marginTop: '0.75rem' }}>Smart ToDo</h1>
      <button className='logout-btn' style={{ width: '4rem', height: '2rem', background: 'transparent', border: '2px solid #e85a4f', borderRadius: '5px', color: '#e85a4f', marginRight: '2rem', marginTop: '0.7rem' }} onClick={logOut} href="/home">Logout</button>
    </div >
  )
}