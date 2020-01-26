import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.scss';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from './ItemPicker';
import axios from "axios";
import { FaSearch } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa'
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
    setModal(true);
    setItem('');
    props.changeDisplay();
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
      console.log(all[0].data.findItemsByKeywordsResponse[0].searchResult[0].item[0]);
      const rowOneObjs = []
      const rowTwoObjs = []
      const rowThreeObjs = []
      const rowFourObjs = []
      if (all[2].data.Response !== 'False') {
        const moviesList = all[2].data.Search;
        rowOneObjs.push({ id: 1, category: 'movies', title: moviesList[0].Title, image: moviesList[0].Poster, content: `Year: ${moviesList[0].Year}`, link: '' });
        rowTwoObjs.push({ id: 5, category: 'movies', title: moviesList[1].Title, image: moviesList[1].Poster, content: `Year: ${moviesList[1].Year}`, link: '' });
        rowThreeObjs.push({ id: 9, category: 'movies', title: moviesList[2].Title, image: moviesList[2].Poster, content: `Year: ${moviesList[2].Year}`, link: '' });
        rowFourObjs.push({ id: 13, category: 'movies', title: moviesList[3].Title, image: moviesList[3].Poster, content: `Year: ${moviesList[3].Year}`, link: '' });
      }
      if (all[3].data.totalItems) {
        const booksList = all[3].data.items;
        rowOneObjs.push({ id: 2, category: 'books', title: booksList[0].volumeInfo.title.slice(0, 20), image: booksList[0].volumeInfo.imageLinks || "", content: `Publisher: ${booksList[0].volumeInfo.publisher}`, link: booksList[0].volumeInfo.infoLink })
        rowTwoObjs.push({ id: 6, category: 'books', title: booksList[1].volumeInfo.title.slice(0, 20), image: booksList[1].volumeInfo.imageLinks || "", content: `Publisher: ${booksList[1].volumeInfo.publisher}`, link: booksList[1].volumeInfo.infoLink })
        rowThreeObjs.push({ id: 10, category: 'books', title: booksList[2].volumeInfo.title.slice(0, 20), image: booksList[2].volumeInfo.imageLinks || "", content: `Publisher: ${booksList[2].volumeInfo.publisher}`, link: booksList[2].volumeInfo.infoLink })
        rowFourObjs.push({ id: 14, category: 'books', title: booksList[3].volumeInfo.title.slice(0, 20), image: booksList[3].volumeInfo.imageLinks || "", content: `Publisher: ${booksList[3].volumeInfo.publisher}`, link: booksList[3].volumeInfo.infoLink })
      }
      if (all[0].data.findItemsByKeywordsResponse[0].searchResult[0].item) {
        const productslist = all[0].data.findItemsByKeywordsResponse[0].searchResult[0].item;
        rowOneObjs.push({ id: 3, category: 'products', title: `${productslist[0].title[0].slice(0, 20)}...`, image: productslist[0].galleryURL[0], content: `Price: ${productslist[0].sellingStatus[0].currentPrice[0]._value_}`, link: productslist[0].url });
        rowTwoObjs.push({ id: 7, category: 'products', title: `${productslist[1].title[0].slice(0, 20)}...`, image: productslist[1].galleryURL[0], content: `Price: ${productslist[1].sellingStatus[0].currentPrice[0]._value_}`, link: productslist[1].url, });
        rowThreeObjs.push({ id: 11, category: 'products', title: `${productslist[2].title[0].slice(0, 20)}...`, image: productslist[2].galleryURL[0], content: `Price: ${productslist[2].sellingStatus[0].currentPrice[0]._value_}`, link: productslist[2].url });
        rowFourObjs.push({ id: 15, category: 'products', title: `${productslist[3].title[0].slice(0, 20)}...`, image: productslist[3].galleryURL[0], content: `Price: ${productslist[3].sellingStatus[0].currentPrice[0]._value_}`, link: productslist[2].url });
      }
      if (all[1].data.businesses.length) {
        const businessesList = all[1].data.businesses;
        rowOneObjs.push({ id: 4, category: 'restaurants', title: businessesList[0].name, image: businessesList[0].image_url, content: `Address: ${businessesList[0].location.address1}`, link: businessesList[0].url })
        rowTwoObjs.push({ id: 8, category: 'restaurants', title: businessesList[1].name, image: businessesList[1].image_url, content: `Address: ${businessesList[1].location.address1}`, link: businessesList[1].url });
        rowThreeObjs.push({ id: 12, category: 'restaurants', title: businessesList[2].name, image: businessesList[2].image_url, content: `Address: ${businessesList[2].location.address1}`, link: businessesList[2].url });
        rowFourObjs.push({ id: 16, category: 'restaurants', title: businessesList[3].name, image: businessesList[3].image_url, content: `Address: ${businessesList[3].location.address1}`, link: businessesList[3].url })
      }
      setState({
        ...state,
        rowOne: rowOneObjs,
        rowTwo: rowTwoObjs,
        rowThree: rowThreeObjs,
        rowFour: rowFourObjs
      })
    });
  }
  const add = (item) => {
    console.log(item)
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

    console.log(searchBtn)
  }


  return (
    <div class="navBar" style={{ width: '100%', height: '3.5rem', backgroundColor: '#eae7dc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
      <div style={{ float: 'left', width: '5rem' }}>
        <form id="content">
          <input type="text" name="input" class="input" id="search-input" />
          <button type="reset" class="search" id="search-btn" onClick={click}></button>
        </form>
        <select id='hide' className="show" selected="selected">
          <option>Movies</option>
          <option>Books</option>
          <option>products</option>
          <option>restaurants</option>
          <FaCaretDown />
        </select>
      </div>
      <h1 href="#home" style={{ color: '#e85a4f', fontFamily: 'Nunito', fontWeight: '900', fontSize: '1.5rem', marginTop: '0.75rem' }}>Smart ToDo</h1>
      <button className='logout-btn' style={{ width: '4rem', height: '2rem', background: 'transparent', border: '2px solid #e85a4f', borderRadius: '5px', color: '#e85a4f', marginRight: '2rem', marginTop: '0.7rem' }} onClick={logOut} href="/home">Logout</button>
      {/* <Nav className="mr-auto"> */}
      {/* {searchBar &&

        {/* </Nav> */}
      {/* {searchBar && <Form inline
          onChange={(event) => setItem(event.target.value)}>
          <FormControl value={item} type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" style={{ width: '5rem', color: 'white', borderColor: 'white' }} onClick={() => search(item)}>Search</Button>
        </Form>} */}
      {/* {modal && <Modal list={state} onAdd={add} onClose={close} noData={noData} />} */}
    </div >
  )
}