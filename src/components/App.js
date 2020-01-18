import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from '@bit/lekanmedia.shared-ui.search-bar';
import DropDown from './DropDown';

const searchBarStyle = {
  margin: '40px',
  display: 'block',
  justifyContent: 'center',
  alignItem: 'center',
  width: 400,
  height: 40,
  textAlign: 'center'
};


function App() {

  const [state, setState] = React.useState({
    group: ''
  })

  const select = data => {
    setState({
      group: data.group
    })
  }
  const search = () => {
    if (state.group === 'product') {
      console.log('product')
    } else if (state.group === 'business') {
      console.log('business')
    } else if (state.group === 'movie') {
      console.log('movie')
    } else {
      console.log('book')
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={searchBarStyle}>
          <DropDown onSelect={select} />
          <SearchBar onSearch={search} />
        </div>
      </header>
    </div>
  );
}

export default App;
