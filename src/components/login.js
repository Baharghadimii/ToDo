import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col';
export default function Login(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    error: false,
    showLogin: true,
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
    setState({ ...state, showLogin: true })
  }
  return (
    <div>
      {state.showLogin &&
        <div style={{ width: '100%', height: 'auto' }}>
          {state.error && (
            < Alert style={{ width: '30%', margin: '0 auto', marginTop: '3%' }} variant='danger'>
              Email or password is incorrect!
          </Alert>)}
          <form style={{ width: '50%', height: '20rem', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginLeft: '5rem', marginTop: '3.5rem', fontFamily: 'Nunito', fontSize: '20px' }}>Email address</label>
            <input style={{ paddingLeft: '1rem', margin: '0 auto', width: '70%', borderRadius: '5px', backgroundColor: 'white', borderColor: '#ABB2B9', color: '#ABB2B9', fontFamily: 'Nunito', marginTop: '-15px', height: '2.5rem' }} onChange={e => setState({ ...state, email: e.target.value })} type="email" placeholder="Enter email" />
            <label style={{ marginLeft: '5rem', marginTop: '2rem', fontFamily: 'Nunito', fontSize: '20px' }}>Password</label>
            <input style={{ paddingLeft: '1rem', margin: '0 auto', width: '70%', borderRadius: '5px', backgroundColor: 'white', borderColor: '#ABB2B9', color: '#ABB2B9', fontFamily: 'Nunito', marginTop: '-15px', height: '2.5rem' }} onChange={e => setState({ ...state, password: e.target.value })} type="password" placeholder="Password" />
          </form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: '20%', margin: '0 auto', marginTop: '-4rem', marginBottom: '1.5rem' }} variant="primary" type="submit" onClick={login} >
              Login
      </Button>
            <a style={{ cursor: 'pointer', margin: '0 auto' }} href='#' onClick={showRegister}>Don't Have an account?!</a>
          </div>
        </div>
      }

      {!state.showLogin && (
        <div>
          <form style={{ width: '50%', height: '23rem', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginLeft: '5rem', marginTop: '2rem', fontFamily: 'Nunito', fontSize: '20px' }}>Email address</label>
            <input style={{ paddingLeft: '1rem', margin: '0 auto', width: '70%', borderRadius: '5px', backgroundColor: 'white', borderColor: '#ABB2B9', color: '#ABB2B9', fontFamily: 'Nunito', marginTop: '-15px', height: '2.5rem' }} onChange={e => setState({ ...state, email: e.target.value })} type="email" placeholder="Enter email" />
            <p style={{ margin: '0 auto', marginTop: '2rem' }} className="text-muted">
              We'll never share your email with anyone else.
          </p>
            <label style={{ marginLeft: '5rem', marginTop: '0.5rem', fontFamily: 'Nunito', fontSize: '20px' }}>Password</label>
            <input style={{ paddingLeft: '1rem', margin: '0 auto', width: '70%', borderRadius: '5px', backgroundColor: 'white', borderColor: '#ABB2B9', color: '#ABB2B9', fontFamily: 'Nunito', marginTop: '-15px', height: '2.5rem' }} onChange={e => setState({ ...state, email: e.target.value })} type="email" placeholder="Enter password" />
            <label style={{ marginLeft: '5rem', marginTop: '2rem', fontFamily: 'Nunito', fontSize: '20px' }}>Password Confirmation</label>
            <input style={{ paddingLeft: '1rem', margin: '0 auto', width: '70%', borderRadius: '5px', backgroundColor: 'white', borderColor: '#ABB2B9', color: '#ABB2B9', fontFamily: 'Nunito', marginTop: '-15px', height: '2.5rem' }} onChange={e => setState({ ...state, email: e.target.value })} type="email" placeholder="Enter password" />
          </form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: '20%', margin: '0 auto' }} variant="primary" type="submit" onClick={register} >
              Create Acoount
            </Button>
            <a style={{ margin: '0 auto', marginTop: '2%', cursor: 'pointer' }} href='#' onClick={showLogin}>Already have an account?!</a>
          </div>
        </div>)}
    </div >

  )
}