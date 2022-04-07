import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center pb-4 mt-5">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="checkout-head">SIGN IN</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>SIGN IN</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="checkout-head"> SHIPPING</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>SHIPPING</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="checkout-head">PAYMENT</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>PAYMENT</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="checkout-head">PLACE ORDER</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>PLACE ORDER</Nav.Link>
        )}
      </Nav.Item>
      <br/>
    </Nav>
  );
}

export default CheckoutSteps
