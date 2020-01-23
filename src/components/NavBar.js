import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from './ItemPicker';
import axios from "axios";
import { googleApi, yelpApi, etsyApi, omdbApi } from '../api-keys';

export default function NavBar(props) {
  const [state, setState] = React.useState({
    rowOne: [],
    rowTwo: [],
    rowThree: [],
    rowFour: []
  })
  const [item, setItem] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [searchBar, setSearchBar] = React.useState();

  const search = (item) => {
    setModal(true);
    props.changeDisplay();
    Promise.all([
      Promise.resolve(axios.get(`https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?tags=${item}&limit=12&includes=Images:1&api_key=${etsyApi}`)),
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
      if (all[0].data.results.length > 0) {
        const productslist = all[0].data.results;
        rowOneObjs.push({ id: 3, category: 'products', title: `${productslist[0].title.slice(0, 20)}...`, image: productslist[0].Images[0].url_170x135, content: `Price: ${productslist[0].price}`, link: productslist[0].url });
        rowTwoObjs.push({ id: 7, category: 'products', title: `${productslist[1].title.slice(0, 20)}...`, image: productslist[1].Images[0].url_170x135, content: `Price: ${productslist[1].price}`, link: productslist[1].url, });
        rowThreeObjs.push({ id: 11, category: 'products', title: `${productslist[2].title.slice(0, 20)}...`, image: productslist[2].Images[0].url_170x135, content: `Price: ${productslist[2].price}`, link: productslist[2].url });
        rowFourObjs.push({ id: 15, category: 'products', title: `${productslist[3].title.slice(0, 20)}...`, image: productslist[3].Images[0].url_170x135, content: `Price: ${productslist[3].price}`, link: productslist[2].url });
      }
      if (all[1].data.businesses.length > 0) {
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
    console.log(item);
    axios.post(`http://localhost:3001/api/1/add/`, { item })
      .then(res => {

      });
    setModal(false);
    props.showList(item);
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
  return (
    <div className='Nav' >
      <Navbar style={{ backgroundColor: '#2E4053' }} variant="dark">
        <Navbar.Brand href="#home">ToDo</Navbar.Brand>
        <Nav className="mr-auto">
          {searchBar && <Nav.Item>
            <Nav.Link onClick={logOut} href="/home">Logout</Nav.Link>
          </Nav.Item>}
        </Nav>
        {searchBar && <Form inline
          value={item}
          onChange={(event) => setItem(event.target.value)}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" style={{ width: '5rem', color: 'white', borderColor: 'white' }} onClick={() => search(item)}>Search</Button>
        </Form>}
      </Navbar>
      {modal && <Modal list={state} onAdd={add} onClose={close} />}
    </div>
  )
}