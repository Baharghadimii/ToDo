import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function Login(props) {

  const submit = () => {
    localStorage.setItem('token', 'bahar');
    props.login()
  }
  return (
    <Form onSubmit={submit} style={{ width: '40%', margin: '0 auto', marginTop: '8%', textAlign: 'left' }}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
    </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
  </Button>
    </Form>
  )
}