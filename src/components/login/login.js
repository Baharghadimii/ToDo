import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Login.scss'
import Alert from 'react-bootstrap/Alert';

export default function Login(props) {

  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
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
          console.log(res.data);
          const token = { session: res.data.id }
          localStorage.setItem('token', JSON.stringify(token));
          props.reset();
        } else {
          setState({ ...state, error: true })
        }
      });
  }
  const register = () => {
    if (state.password === state.passwordConfirmation) {
      axios.post(`http://localhost:3001/api/register/`, { user: { email: state.email, password: state.password } })
        .then(res => {
          const token = { session: res.data.id }
          localStorage.setItem('token', JSON.stringify(token));
          props.reset();
        });
    } else {
      console.log('no')
    }
  }
  const showRegister = () => {
    setState({ ...state, showLogin: false })
  }
  const showLogin = () => {
  }
  return (
    <div className='main'>
      <div className="card">
        <div className='label'>
          <label >Email</label>
        </div>
        <div className='input'>
          <input type='email' placeholder="Enter your email"></input>
        </div>
        <label>Password</label>
        <input type='password' placeholder="Enter your password"></input>
      </div>
    </div >

  )
}