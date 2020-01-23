import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function Login(props) {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const submit = () => {
    localStorage.setItem('token', JSON.stringify(state));
    props.login()
  }
  console.log(state)
  return (
    <Form onSubmit={submit} style={{ width: '40%', margin: '0 auto', marginTop: '8%', textAlign: 'left' }}>
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
      <Button variant="primary" type="submit" >
        Submit
  </Button>
    </Form>
  )
}