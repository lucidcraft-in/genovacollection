import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import './Login.css';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    // <FormContainer>
    //   <h1>Sign Up</h1>
    //   {message && <Message variant='danger'>{message}</Message>}
    //   {error && <Message variant='danger'>{error}</Message>}
    //   {loading && <Loader />}
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group controlId='name'>
    //       <Form.Label>Name</Form.Label>
    //       <Form.Control
    //         type='name'
    //         placeholder='Enter name'
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId='email'>
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type='email'
    //         placeholder='Enter email'
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId='password'>
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Enter password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId='confirmPassword'>
    //       <Form.Label>Confirm Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Confirm password'
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Button type='submit' variant='primary'>
    //       Register
    //     </Button>
    //   </Form>

    //   <Row className='py-3'>
    //     <Col>
    //       Have an Account?{' '}
    //       <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
    //         Login
    //       </Link>
    //     </Col>
    //   </Row>
    // </FormContainer>
    <>
      {' '}
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="wrapper">
            <div className="title">
              <span>Sign Up</span>
            </div>
            <form onSubmit={submitHandler}>
              <div className="row">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <i className="fa fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {/* <div className="pass">
              <a href="#">Forgot password?</a>
            </div> */}
              <div className="row button">
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link ">
                Have an Account?
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterScreen
