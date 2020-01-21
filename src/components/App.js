import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Category from './Category';

function App() {
  const [state, setState] = React.useState({
    showList: true
  });
  const changeDisplay = () => {
    setState({ ...state, showList: false })
  }
  const showList = (items) => {
    setState({ ...state, list: items, showList: true });
  }
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
