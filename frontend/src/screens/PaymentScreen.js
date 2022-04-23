import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import Card from 'react-bootstrap/Card';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('C O D');
 

  const dispatch = useDispatch()

  useEffect(() => {
   window.scrollTo({
     top: 0,
     behavior: 'smooth',
     /* you can also use 'auto' behaviour
          in place of 'smooth' */
   });
  }, [])
  

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler} className="product-price-text mb-4">
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col className="p-3">
            <Row xs={1} md={2} className="g-4">
              <Col>
                <Card
                  className={
                    paymentMethod === 'DEBIT / CREDIT CARD'
                      ? 'payment-card payment-selected'
                      : 'payment-card'
                  }
                  onClick={(e) => setPaymentMethod('DEBIT / CREDIT CARD')}
                >
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col md={8} className="payment-card-head">
                          Credit / Debit Card
                        </Col>
                        <Col md={4}>
                          {' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="currentColor"
                            className="bi bi-credit-card"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                          </svg>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className={
                    paymentMethod === 'C O D'
                      ? 'payment-card payment-selected'
                      : 'payment-card'
                  }
                  onClick={(e) => setPaymentMethod('C O D')}
                >
                  <Card.Body>
                    <Card.Text>
                      {' '}
                      <Row>
                        <Col md={8} className="payment-card-head">
                          C O D
                        </Col>
                        <Col md={4}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="currentColor"
                            className="bi bi-wallet2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                          </svg>
                        </Col>{' '}
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* <Form.Check
              type="radio"
              label="  Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="C O D"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen
