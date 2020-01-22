import React, { useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import Category from './Category';
import axios from 'axios';

function App() {
  const [state, setState] = React.useState({
    showList: true,
    movies: [],
    books: [],
    products: [],
    restaurants: []
  });
  const changeDisplay = () => {
    setState({ ...state, showList: false })
  }
  const showList = (items) => {
    setState({ ...state, list: items, showList: true });
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:3001/api/1/movies', {
        Headers: new Headers({ 'content-type': 'application/json' })
      })),
      Promise.resolve(axios.get('http://localhost:3001/api/1/books', {
        Headers: new Headers({ 'content-type': 'application/json' })
      })),
      Promise.resolve(axios.get('http://localhost:3001/api/1/products', {
        Headers: new Headers({ 'content-type': 'application/json' })
      })),
      Promise.resolve(axios.get('http://localhost:3001/api/1/restaurants', {
        Headers: new Headers({ 'content-type': 'application/json' })
      }))
    ]).then(all => {

    })
  })

  // console.log(state);
  return (
    <div className="App">
      <header className="App-header">
        <NavBar changeDisplay={changeDisplay} showList={showList} />
      </header>
      {state.showList && <Category list={state.list} />}
    </div>
  );
}

export default App;
