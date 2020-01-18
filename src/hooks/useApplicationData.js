import { useReducer, useEffect } from 'react';
import axios from "axios";
import yelpApi from '../api-keys';


export default function applicationData() {

  const clientId = 'aGe9u46p0CEZYsKQqDOATw';
  const apiKey = yelpApi;

  axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: `Bearer ${apiKey}`,

    },
    params: {
      location: 'vancouver',
      term: 'Startbucks',
    }
  }).then(res => console.log(res));

}