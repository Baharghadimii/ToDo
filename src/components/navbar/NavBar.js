import React, { useEffect } from 'react';
import './NavBar.scss';

export default function NavBar(props) {
  const [logged, setLogged] = React.useState(false);

  useEffect(() => {
    setLogged(localStorage.getItem('token') ? true : false)
  }, [])
  return (
    <div>
      {!logged && (
        <div class="navBar" style={{ width: '100%', height: '4rem', marginLeft: '1rem' }} >
          <h1 href="#home" style={{ margin: '1.5rem 0 0 2rem', float: 'left', color: '#3750b2', fontFamily: 'Nunito', fontWeight: '900', fontSize: '2rem' }}>Smart ToDo</h1>
          <button className="log-btn" onClick={props.showLogin}>Login</button>
        </div>
      )}
    </div>

  )
}