import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from '@bit/lekanmedia.shared-ui.search-bar';

const style = {
  margin: '40px',
  display: 'block',
  justifyContent: 'center',
  alignItem: 'center',
  width: 400,
  height: 40,
  textAlign: 'center'
};

function App() {
  const search = value => {
    console.log(value)
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={style}>
          <SearchBar onSearch={search} />
        </div>
      </header>
    </div>
  );
}

export default App;
