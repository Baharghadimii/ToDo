import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss';

export default function Login(props) {

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    showLogin: props.displayLogin ? true : false,
  });

  const login = () => {
    axios.get(`http://localhost:3001/api/user/`, {
      params: {
        email: state.email,
        password: state.password
      }
    })
      .then(res => {
        if (res.data) {
          const token = { session: res.data.id, favorites: [] }
          localStorage.setItem('token', JSON.stringify(token));
          props.reset();
        } else {
          setState({ ...state, error: true })
        }
      });
  }
  const register = () => {
    axios.post(`http://localhost:3001/api/register/`, {
      user:
        { name: state.name, email: state.email, password: state.password }
    })
      .then(res => {
        const token = { session: res.data.id }
        localStorage.setItem('token', JSON.stringify(token));
        props.reset();
      });
  }
  return (
    <div className='main'>
      <img
        alt='background'
        data-aos="fade-right"
        className='img-one' src='https://smarttodo.s3.ca-central-1.amazonaws.com/Asset+1%403x+(5).png'></img>
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="card">
        <div className="input-div">
          {!state.showLogin && <div className='label'>
            <label>Name</label>
          </div>}
          {!state.showLogin && <div className='input'>
            <input
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              type='text'
              placeholder="Enter your Name"></input>
          </div>}
          {!state.showLogin && <div className='label'>
            <label >Email</label>
          </div>}
          {!state.showLogin && <div className='input'>
            <input
              value={state.email}
              type='email'
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="Enter your email"></input>
          </div>}
          {state.showLogin && <div
            className='label'
            style={{ marginTop: '10%' }}>
            <label >Email</label>
          </div>}
          {state.showLogin && <div className='input'>
            <input
              type='email'
              placeholder="Enter your email"
              value={state.email}
              onChange={e => setState({ ...state, email: e.target.value })}
            ></input>
          </div>}
          <div className='label'>
            <label>Password</label>
          </div>
          <div className='input'>
            <input
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              type='password'
              placeholder="Enter your Password"></input>
          </div>
          {!state.showLogin && < button className='login-btn' onClick={register}> Sign Up</button>}
          {state.showLogin && < button className='login-btn' onClick={login}> Log In</button>}
        </div>
        <div className="auth-div">
          <button id="facebook">
            <img id="icon-fb" src="https://smarttodo.s3.ca-central-1.amazonaws.com/facebook.png" />
            Login with Facebook</button>
          <button id="google">
            <img id="icon-gle" src="https://avatars1.githubusercontent.com/u/7328930?v=4" />
            Login with Google</button>
        </div>
      </div>
      <img
        alt='background'
        data-aos="fade-left"
        className='img-two'
        src='https://smarttodo.s3.ca-central-1.amazonaws.com/Asset+2%403x+(2).png'></img>

    </div >

  )
}