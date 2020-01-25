import React, { useEffect } from 'react';
import './App.scss';
import NavBar from './NavBar';
import Category from './Category';
import axios from 'axios';
import Login from './login';

function App() {
  const [state, setState] = React.useState({
    showList: localStorage.getItem('token') ? true : false,
    list: [],
    token: JSON.parse(localStorage.getItem('token')) || null
  });
  const changeDisplay = () => {
    setState({ ...state, showList: false })
  }
  const deleteItem = (id) => {
    const userId = JSON.parse(localStorage.getItem('token')).session;

    axios.delete(`http://localhost:3001/api/${userId}/delete/${id}`)
      .then(res => console.log(res));
    const updatedList = [];
    state.list.forEach(category => {
      const items = category.filter(item => item.id !== id);
      updatedList.push(items)
    });
    setState({ ...state, list: updatedList });
  }
  const reset = () => {
    window.location.reload(true);
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

  useEffect(() => {
    if (state.token) {
      const userId = JSON.parse(localStorage.getItem('token')).session;
      Promise.all([
        Promise.resolve(axios.get(`http://localhost:3001/api/${userId}/movies`, {
          Headers: new Headers({ 'content-type': 'application/json' })
        })),
        Promise.resolve(axios.get(`http://localhost:3001/api/${userId}/books`, {
          Headers: new Headers({ 'content-type': 'application/json' })
        })),
        Promise.resolve(axios.get(`http://localhost:3001/api/${userId}/products`, {
          Headers: new Headers({ 'content-type': 'application/json' })
        })),
        Promise.resolve(axios.get(`http://localhost:3001/api/${userId}/restaurants`, {
          Headers: new Headers({ 'content-type': 'application/json' })
        }))
      ]).then(all => {
        // console.log(all);
        let temp = [];
        const movies = all[0].data;
        temp.push(movies);
        const books = all[1].data;
        if (all[1].data[0]) {
          if (all[1].data[0].title.length > 20) {
            books[0].title = `${books[0].title.slice(0, 20)}...`;
          }
        }
        temp.push(books);
        const products = all[2].data;
        if (all[2].data[0]) {
          if (all[2].data[0].title.length > 20) {
            products[0].title = `${products[0].title.slice(0, 20)}...`;
          }
        }
        temp.push(products);
        const restaurants = all[3].data;
        temp.push(restaurants);
        setState({
          ...state,
          list: temp
        })
      })
    }

  }, [])
  // console.log(state)
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <NavBar changeDisplay={changeDisplay} showList={showList} reset={reset} />
      {/* </header> */}
      {!localStorage.getItem('token') && <Login reset={reset} />}
      {state.showList && <Category delete={deleteItem} list={state.list} showList={showList} />}
    </div>
  );
}

export default App;
