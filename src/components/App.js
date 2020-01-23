import React, { useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import Category from './Category';
import axios from 'axios';
import Login from './login';

function App() {
  const [state, setState] = React.useState({
    showList: localStorage.getItem('token') ? true : false,
    list: []
  });
  const changeDisplay = () => {
    setState({ ...state, showList: false })
  }
  const deleteItem = (id) => {
    axios.delete(`http://localhost:3001/api/1/delete/${id}`)
      .then(res => console.log(res));
    const updatedList = [];
    state.list.forEach(category => {
      const items = category.filter(item => item.id !== id);
      updatedList.push(items)
    });
    setState({ ...state, list: updatedList });
  }
  const reset = () => {
    setState({ ...state, showList: true })
  }
  const showList = (item) => {
    let temp = []
    item.forEach(element => {
      if (element.category === 'movies') {
        temp = state.list;
        temp[0].push(element);
      }
      if (element.category === 'books') {
        temp = state.list;
        temp[1].push(element);
      }
      if (element.category === 'products') {
        temp = state.list;
        temp[2].push(element);
      }
      if (element.category === 'restaurants') {
        temp = state.list;
        temp[3].push(element);
      }
    })


    setState({ ...state, list: temp, showList: true });
  }
  const login = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token)
    axios.get('http://localhost:3001/api/userId', { token })
      .then(res => console.log(res));
    if (token) {
      setState({ ...state, showList: true });
    }
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
      let temp = [];
      const movies = all[0].data;
      temp.push(movies);
      const books = all[1].data;
      if (all[1].data[0].title.length > 20) {
        books[0].title = `${books[0].title.slice(0, 20)}...`;
      }
      temp.push(books);
      const products = all[2].data;
      if (all[2].data[0].title.length > 20) {
        products[0].title = `${products[0].title.slice(0, 20)}...`;
      }
      temp.push(products);
      const restaurants = all[3].data;
      temp.push(restaurants);
      setState({
        ...state,
        list: temp
      })
    })
  }, [])
  // console.log(state)
  return (
    <div className="App">
      <header className="App-header">
        <NavBar changeDisplay={changeDisplay} showList={showList} reset={reset} />
      </header>
      {!state.showList && <Login login={login} />}
      {state.showList && <Category delete={deleteItem} list={state.list} showList={showList} />}
    </div>
  );
}

export default App;
