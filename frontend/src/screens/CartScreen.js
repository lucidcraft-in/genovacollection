import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { listStock} from '../actions/stockAction';

const CartScreen = ({ match, location, history }) => {
  // const productId = match.params.id

  // const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const [stockAvailable, setStock] = useState(0);
   const [qty, setQty] = useState(1);

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

 const stockList = useSelector((state) => state.stockList);
 const {  stocks } = stockList;

   console.log(stocks);

  useEffect(() => {
    // if (productId) {
    //   dispatch(addToCart(productId, qty))
    // }
      dispatch(listStock(''));
  }, [dispatch])

  const removeFromCartHandler = (id) => {
      if (window.confirm('Are you sure , remove item from cart')) {
        dispatch(removeFromCart(id));
      }
     
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const changeQnt = (val,item) => {
    if (val === 'plus') {
       
      
      let stock = stocks.filter((st) => st.product === item.product && st.size === item.size && st.color ===item.color);
      
       
      if (stock[0].count > item.qty) {
        dispatch(addToCart(item.product, Number(item.qty + 1), item.size , item.color));
        setQty(qty + 1);
      } 
    }

    if (val === 'minus' && item.qty > 0) {
      dispatch(addToCart(item.product, Number(item.qty - 1), item.size , item.color));
      setQty(item.qty-1);
    }
  };
 

 
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className="product-head-text"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2} className="product-price-text">
                    {' '}
                    {item.price} AED
                  </Col>
                  <Col md={2}>
                    <div class="quantity buttons_added">
                      <input
                        type="button"
                        value="-"
                        class="minus"
                        onClick={(e) => changeQnt('minus', item)}
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max={stockAvailable}
                        name="quantity"
                        title="Qty"
                        class="input-text qty text"
                        size="4"
                        pattern=""
                        inputmode=""
                        value={item.qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                      <input
                        type="button"
                        value="+"
                        class="plus"
                        onClick={(e) => changeQnt('plus', item)}
                      />
                    </div>
                    {/* <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control> */}
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item className="product-price-text">
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{' '}
              AED
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen
