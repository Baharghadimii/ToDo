import React, { useEffect } from 'react';
import './App.scss';
import NavBar from '../navbar/NavBar';
import axios from 'axios';
import Login from '../login/login';
import Category from '../category/Category';
import ItemCard from '../item-card/ItemCard';
import Home from '../home/Home';

function App() {
  const [state, setState] = React.useState({
    signUp: false,
    login: false,
    home: localStorage.getItem('token') ? false : true,
    showList: localStorage.getItem('token') ? true : false,
    list: [],
    token: JSON.parse(localStorage.getItem('token')) || null,
    showItem: false,
    item: {}
  });
  const reset = () => {
    window.location.reload(true);
  }
  const show = (chosenItem) => {
    setState({ ...state, showItem: true, showList: false, item: chosenItem })
  }
  const displayForm = (type) => {
    if (type === 'login') {
      setState({ ...state, login: true, home: false })
    } else {
      setState({ ...state, signUp: true, home: false })
    }
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
        let temp = state.list;
        const movies = all[0].data;
        if (movies[0]) {
          movies.forEach((element, index) => {
            movies[index]['longTitle'] = movies[index].title;
            if (element.title.length > 10) {
              movies[index].title = `${movies[index].title.slice(0, 10)}...`;
            }
          })
          temp.push({ category: 'Movies', value: movies });
        }
        const books = all[1].data;
        if (all[1].data[0]) {
          books.forEach((element, index) => {
            books[0]['longTitle'] = books[0].title;
            if (element.title.length > 10) {
              books[index].title = `${books[index].title.slice(0, 10)}...`;
            }
          })
          temp.push({ category: 'Books', value: books });
        }

        const products = all[2].data;
        if (all[2].data[0]) {
          products.forEach((element, index) => {
            products[0]['longTitle'] = products[0].title;
            if (element.title.length > 10) {
              products[index].title = `${products[index].title.slice(0, 10)}...`;
            }
          })
          temp.push({ category: 'Products', value: products });
        }
        const restaurants = all[3].data;
        if (all[3].data[0]) {
          restaurants.forEach((element, index) => {
            restaurants[0]['longTitle'] = restaurants[0].title;
            if (element.title.length > 10) {
              restaurants[index].title = `${restaurants[index].title.slice(0, 10)}...`;
            }
          })
          temp.push({ category: 'Restaurants', value: restaurants });
        }
        setState({
          ...state,
          list: temp
        })
      })
    }

  }, [])
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      {state.home &&
        <div>
          < NavBar reset={reset} showLogin={() => displayForm('login')} />
          <Home showSignUp={() => displayForm('signup')} />
        </div>}
      {state.signUp && <Login reset={reset} displayLogin={false} />}
      {state.login && <Login reset={reset} displayLogin={true} />}
      {state.showList && < Category list={state.list} reset={reset} show={show} />}
      {state.showItem && <ItemCard item={state.item} showList={() => setState({ ...state, showItem: false, showList: true })} />}
    </div>
  );
}

export default App;