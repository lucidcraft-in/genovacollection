import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants';
import './Order.css';

const SingleOrderScreen = ({ match, history }) => {
 const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

 console.log(order);

  return loading ? (
    <Loader />
  ) : error ? (
    <Loader />
  ) : (
    <>
      <Row className="single-order-bg">
        <Col md={6}>
          <Link className="btn btn-light my-1" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </Link>
          <Card className="single-order-card card-order">
            <span className="single-order-head">Delivery Address</span>
            <div className="single-order-user">{order.user.name}</div>
            <div className="single-order-address">
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              <br /> {order.shippingAddress.apartment},{' '}
              {order.shippingAddress.emirate}
            </div>
            <div className="single-order-address">
              <span className="single-order-head"> Phone number </span>
              {order.shippingAddress.phone}
            </div>
            <hr />
            <div className="row px-3">
              <div className="col">
                <ul id="progressbar">
                  <li
                    className={
                      order.isShipped === true ? 'step0 active' : 'step0'
                    }
                    id="step1"
                  >
                    PLACED
                  </li>
                  <li
                    className={
                      order.isShipped === true
                        ? 'step0 active text-center'
                        : 'step0 text-center'
                    }
                    id="step2"
                  >
                    SHIPPED
                  </li>
                  <li
                    className={
                      order.isDelivered === true
                        ? 'step0 active text-muted text-right'
                        : 'step0 text-muted text-right'
                    }
                    id="step3"
                  >
                    DELIVERED
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <div className="container-fluid my-5 d-sm-flex justify-content-center order-card">
            <div className="card-order px-2">
              <div className="card-header bg-white">
                <div className="row justify-content-between">
                  <div className="col">
                    <p className="text-muted">
                      {' '}
                      Order ID <span className="  text-dark">#{order._id}</span>
                    </p>
                    <p className="text-muted">
                      {' '}
                      Place On{' '}
                      <span className="font-weight-bold text-dark">
                        {order.paidAt && order.paidAt.substring(0, 10)}
                      </span>{' '}
                    </p>
                  </div>
                  <div className="flex-col my-auto">
                    <h6 className="ml-auto mr-3">
                      {' '}
                      {/* <a href="#">View Details</a>{' '} */}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {order.orderItems.map((item, index) => (
                  <div
                    className="media flex-column flex-sm-row mt-3"
                    key={index}
                  >
                    <div className="media-body ">
                      <h5 className="bold"> {item.name}</h5>
                      <p className="text-muted"> Qt: {item.qty}</p>
                      <h4 className="mt-3 mb-4 bold">
                        {' '}
                        AED {item.qty * item.price}{' '}
                        <span className="small text-muted">
                          {' '}
                          via {order.paymentMethod}{' '}
                        </span>
                      </h4>
                      <p className="text-muted">
                        Tracking Status on:{' '}
                        <span className="Today">11:30pm, Today</span>
                      </p>{' '}
                      <button
                        type="button"
                        className="btn btn-outline-primary d-flex"
                      >
                        {order.isShipped === false ? (
                          <span>Ready for Shipping</span>
                        ) : (
                          <span>Delivered Soon...</span>
                        )}
                      </button>
                    </div>
                    <img
                      className="align-self-center img-fluid"
                      src={item.image}
                      width="180 "
                      height="180"
                    />
                  </div>
                ))}
              </div>

              {/* <div className="card-footer bg-white px-sm-3 pt-sm-4 px-0">
                <div className="row text-center ">
                  <div className="col my-auto border-line ">
                    <h5>Track</h5>
                  </div>
                  <div className="col my-auto border-line ">
                    <h5>Cancel</h5>
                  </div>
                  <div className="col my-auto border-line ">
                    <h5>Pre-pay</h5>
                  </div>
                  <div className="col my-auto mx-0 px-0 ">
                    <img
                      className="img-fluid cursor-pointer"
                      src="https://img.icons8.com/ios/50/000000/menu-2.png"
                      width="30"
                      height="30"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

 

export default SingleOrderScreen;
