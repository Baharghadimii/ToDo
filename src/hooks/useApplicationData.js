import { useReducer, useEffect } from 'react';
import axios from "axios";
import { googleApi, yelpApi, shopifyApi, rottenTomatoApi } from '../api-keys';

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
  //shopify api for products
  axios.get(`http://www.omdbapi.com/?apikey=${rottenTomatoApi}&s=game+of+thrones`)
    .then(res => console.log(res))
  //rotten tomato api for movies and series


}