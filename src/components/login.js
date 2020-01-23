import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
export default function Login(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    error: false,
    showLogin: true,
  });

  const submit = () => {
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
          props.login();
        } else {
          setState({ ...state, error: true })
        }
      });
  }
  const test = () => {
    setState({ ...state, showLogin: false })
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
            <Button style={{ width: '20%', margin: '0 auto' }} variant="primary" type="submit" onClick={submit} >
              Submit
      </Button>
            <a style={{ marginTop: '1%', cursor: 'pointer' }} href='#' onClick={test}>Don't Have an account?!</a>
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
              <Form.Control onChange={e => setState({ ...state, password: e.target.value })} type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: '20%', margin: '0 auto' }} variant="primary" type="submit" onClick={submit} >
              Submit
      </Button>
            <a style={{ marginTop: '1%', cursor: 'pointer' }} href='#' onClick={test}>Already have an account?!</a>
          </div>
        </div>)}
    </div >

  )
}