import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../components/Message';
import Loader from '../../../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  shippingOrder,
} from '../../../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../../constants/orderConstants';
import Sidebar from '../Sidebar';

const ViewOrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = (e, status) => {
   
     if (window.confirm('Are you sure')) {
       if (status === 0) {
          dispatch(shippingOrder(order));
       } else {
         dispatch(deliverOrder(order));
       }
     }
    // 
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Sidebar />
      <div className="main">
        <>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span className="place-order-head">Shipping</span>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.fName} -{' '}
                    {order.shippingAddress.lName} <br />
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.apartment},{' '}
                    {order.shippingAddress.emirate}
                    <br />
                    {order.shippingAddress.phone}
                  </p>
                  <p>
                    <strong>Status: </strong>{' '}
                    {order.isShipped === false ? (
                      <span style={{ color: 'green', fontWeight: 500 }}>
                        ORDERED
                      </span>
                    ) : order.isDelivered === false ? (
                      <span style={{ color: 'green', fontWeight: 500 }}>
                        SHIPPED
                      </span>
                    ) : (
                      <span style={{ color: 'green', fontWeight: 500 }}>
                        DELIVERED
                      </span>
                    )}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="place-order-head">Payment Method</span>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">
                      Paid on {order.paidAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="place-order-head">Order Items</span>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2} sm={4} xs={3} lg={2}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col md={6} sm={4} xs={4} lg={2}>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4} sm={4} xs={4} lg={2}>
                              {item.qty} x AED {item.price} = AED{' '}
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
                    <span className="place-order-head">Order Summary</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>AED{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>AED{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>AED{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>AED{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {/* {loadingDeliver && <Loader />} */}
                  {/* {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && ( */}
                  <ListGroup.Item>
                    {order.isShipped === false ? (
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={(e) => deliverHandler(e, 0)}
                      >
                        Mark As Shipped
                      </Button>
                    ) : order.isDelivered === false ? (
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={(e) => deliverHandler(e, 1)}
                      >
                        Mark As Delivered
                      </Button>
                    ) : (
                      <Button type="button" className="btn btn-block" disabled>
                        Delivered
                      </Button>
                    )}
                  </ListGroup.Item>

                  {/* // )} */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      </div>
    </div>
  );
};

export default ViewOrderScreen;
