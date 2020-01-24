import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import { stat } from 'fs';
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
        <div>
          {state.error && (
            < Alert style={{ width: '30%', margin: '0 auto', marginTop: '3%' }} variant='danger'>
              Email or password is incorrect!
          </Alert>)}
          <Form style={{ width: '30%', margin: '0 auto', marginTop: '5%', textAlign: 'left' }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={e => setState({ ...state, email: e.target.value })} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={e => setState({ ...state, password: e.target.value })} type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: '20%', margin: '0 auto' }} variant="primary" type="submit" onClick={login} >
              Login
      </Button>
            <a style={{ marginTop: '1%', cursor: 'pointer' }} href='#' onClick={showRegister}>Don't Have an account?!</a>
          </div>
        </div>
      }

      {!state.showLogin && (
        <div>
          <Form style={{ width: '30%', margin: '0 auto', marginTop: '5%', textAlign: 'left' }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={e => setState({ ...state, email: e.target.value })} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
          </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={e => setState({ ...state, password: e.target.value })} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control onChange={e => setState({ ...state, passwordConfirmation: e.target.value })} type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: '20%', margin: '0 auto' }} variant="primary" type="submit" onClick={register} >
              Create Acoount
            </Button>
            <a style={{ marginTop: '1%', cursor: 'pointer' }} href='#' onClick={showLogin}>Already have an account?!</a>
          </div>
        </div>)}
    </div >

  )
}