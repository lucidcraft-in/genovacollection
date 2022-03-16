import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import axios from 'axios';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [isLoadingButton, setLoadingButton] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isValidPromoCode, setIsValidPromoCode] = useState(false);
  const [message, setMessage] = useState('');
  const [savedAmount, setSavedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [promotion, setPromotion] = useState({});


  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }

    setTotalAmount(cart.totalPrice);
    // eslint-disable-next-line
  }, [history, success, cart]);

  const placeOrderHandler = () => {


 
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        isPromoCode: isValidPromoCode,
        promoCode:promoCode,
        promotionOfferPrice: cart.promotionOfferPrice,
        promotion :promotion,
        totalAmount: isValidPromoCode === true ? totalAmount : cart.totalPrice,
      })
    );
  }

  const handleClick = async () => {
    
    if (promoCode==='') { return }
    
    setLoadingButton(true);


    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : [];
    
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/promotion/apply/${promoCode}`,
        '',
        config
    );

    console.log(data);
    
  
    if (data.availability === true) {
      setIsValidPromoCode(true);
      setMessage('');
      reflectPromoOffer();
      setPromotion(data.data);
    } else {
      setLoadingButton(false)
      setMessage(data.message);
    }

  }

  const reflectPromoOffer = () => {
   
    let savedAmount = 0
    
    cart.cartItems.map((item) => {
      
      let offerPrice = item.price * item.promotionPercentage / 100;
      let amount = item.price - offerPrice;

      savedAmount = savedAmount + offerPrice;

      
      item.offerPrice = offerPrice;
      item.amount = amount;
    })
    setSavedAmount(savedAmount);

    cart.promotionOfferPrice = savedAmount;
    cart.totalAmount = cart.totalPrice - savedAmount;

    setTotalAmount(cart.totalPrice - savedAmount);
  }

   

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x aed {item.price} = aed{' '}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>AED{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>AED{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>AED{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {isValidPromoCode ? (
                <ListGroup.Item>
                  <Row>
                    <Col>You saved</Col>
                    <Col>AED {savedAmount}</Col>
                  </Row>
                </ListGroup.Item>
              ) : (
                ''
              )}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>AED{totalAmount}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <input
                      type="text"
                      placeholder="Coupon code "
                      className="p-1"
                      onChange={(e) => setPromoCode(e.target.value)}
                      value={promoCode}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      disabled={isValidPromoCode}
                      onClick={!isLoadingButton ? handleClick : null}
                      style={{
                        fontSize: '6px',
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      {isValidPromoCode
                        ? 'applied'
                        : isLoadingButton
                        ? 'Loading…'
                        : 'Apply Coupon'}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
              {message && <Message variant="danger">{message}</Message>}

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen
