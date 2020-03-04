import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss'

export default function Login(props) {

  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    error: false,
    showLogin: props.displayLogin ? true : false,
  });

  // const login = () => {
  //   axios.get(`http://localhost:3001/api/user/`, {
  //     params: {
  //       email: state.email,
  //       password: state.password
  //     }
  //   })
  //     .then(res => {
  //       if (res.data) {
  //         console.log(res.data);
  //         const token = { session: res.data.id }
  //         localStorage.setItem('token', JSON.stringify(token));
  //         props.reset();
  //       } else {
  //         setState({ ...state, error: true })
  //       }
  //     });
  // }
  const register = () => {
    axios.post(`http://localhost:3001/api/register/`, { user: { email: state.email, password: state.password } })
      .then(res => {
        const token = { session: res.data.id }
        localStorage.setItem('token', JSON.stringify(token));
        props.reset();
      });
  }
  // const showRegister = () => {
  //   setState({ ...state, showLogin: false })
  // }
  // const showLogin = () => {
  // }
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
        {!state.showLogin && <div className='label' id=''>
          <label>Name</label>
        </div>}
        {!state.showLogin && <div className='input'>
          <input type='text' placeholder="Enter your Name"></input>
        </div>}
        {!state.showLogin && <div className='label'>
          <label >Email</label>
        </div>}
        {!state.showLogin && <div className='input'>
          <input type='email' placeholder="Enter your email"></input>
        </div>}
        {state.showLogin && <div
          className='label'
          style={{ marginTop: '10%' }}>
          <label >Email</label>
        </div>}
        {state.showLogin && <div className='input'>
          <input type='email' placeholder="Enter your email"></input>
        </div>}
        <div className='label'>
          <label>Password</label>
        </div>
        <div className='input'>
          <input type='password' placeholder="Enter your Password"></input>
        </div>
        {!state.showLogin && < button className='login-btn' onClick={register}> Sign Up</button>}
        {state.showLogin && < button className='login-btn'> Log In</button>}

      </div>
      <img
        alt='background'
        data-aos="fade-left"
        className='img-two'
        src='https://smarttodo.s3.ca-central-1.amazonaws.com/Asset+2%403x+(2).png'></img>

    </div >

  )
}