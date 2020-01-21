import React from 'react';
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

  const search = (item) => {
    setModal(true);
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
      const productslist = all[0].data.results;
      const businessesList = all[1].data.businesses;
      const moviesList = all[2].data.Search;
      const booksList = all[3].data.items;
      setState({
        ...state,
        rowOne: [
          { id: 1, title: moviesList[0].Title, img: moviesList[0].Poster, obj: moviesList[0] },
          { id: 2, title: booksList[0].volumeInfo.title, img: booksList[0].volumeInfo.imageLinks.thumbnail, obj: booksList[0] },
          { id: 3, title: `${productslist[0].title.slice(0, 20)}...`, img: productslist[0].Images[0].url_170x135, obj: productslist[0] },
          { id: 4, title: businessesList[0].name, img: businessesList[0].image_url, obj: businessesList[0] }],
        rowTwo: [
          { id: 5, title: moviesList[1].Title, img: moviesList[1].Poster, obj: moviesList[1] },
          { id: 6, title: booksList[1].volumeInfo.title, img: booksList[1].volumeInfo.imageLinks.thumbnail, obj: booksList[1] },
          { id: 7, title: `${productslist[1].title.slice(0, 20)}...`, img: productslist[1].Images[0].url_170x135, obj: productslist[1] },
          { id: 8, title: businessesList[1].name, img: businessesList[1].image_url, obj: businessesList[1] }],
        rowThree: [
          { id: 9, title: moviesList[2].Title, img: moviesList[2].Poster },
          { id: 10, title: booksList[2].volumeInfo.title, img: booksList[2].volumeInfo.imageLinks.thumbnail, obj: booksList[2] },
          { id: 11, title: `${productslist[2].title.slice(0, 20)}...`, img: productslist[2].Images[0].url_170x135, obj: productslist[2] },
          { id: 12, title: businessesList[2].name, img: businessesList[2].image_url, obj: businessesList[2] }],
        rowFour: [
          { id: 13, title: moviesList[3].Title, img: moviesList[3].Poster, obj: moviesList[3] },
          { id: 14, title: booksList[3].volumeInfo.title, img: booksList[3].volumeInfo.imageLinks.thumbnail, obj: booksList[3] },
          { id: 15, title: `${productslist[3].title.slice(0, 20)}...`, img: productslist[3].Images[0].url_170x135, obj: productslist[3] },
          { id: 16, title: businessesList[3].name, img: businessesList[3].image_url, obj: businessesList[3] }]
      })
    });
  }
  const add = (itemIds) => {
    const items = [];
    itemIds.forEach(id => {
      state.rowOne.forEach(item => {
        if (id === item.id) {
          items.push(item);
        }
      });
      state.rowTwo.forEach(item => {
        if (id === item.id) {
          items.push(item);
        }
      });
      state.rowThree.forEach(item => {
        if (id === item.id) {
          items.push(item);
        }
      });
      state.rowFour.forEach(item => {
        if (id === item.id) {
          items.push(item);
        }
      })
    })
  }

  return (
    <div className='Nav' >
      <Navbar style={{ backgroundColor: '#2E4053' }} variant="dark">
        <Navbar.Brand href="#home">ToDo</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Form inline
          value={item}
          onChange={(event) => setItem(event.target.value)}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" style={{ width: '5rem' }} onClick={() => search(item)}>Search</Button>
        </Form>
      </Navbar>
      {modal && <Modal list={state} onAdd={add} />}
    </div>
  )
}