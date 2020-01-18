import { useReducer, useEffect } from 'react';
import axios from "axios";
import { googleApi, yelpApi } from '../api-keys';

export default function applicationData() {

  //yelp api for restaurants and cafes
  axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: `Bearer ${yelpApi}`,

    },
    params: {
      location: 'vancouver',
      term: 'Startbucks',
    }
  }).then(res => console.log(res));
  //google api for books
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=game+of+thrones&key=${googleApi}`)
    .then(res => console.log(res))
  //amazon api for products
  //rotten tomato api for movies and series

}