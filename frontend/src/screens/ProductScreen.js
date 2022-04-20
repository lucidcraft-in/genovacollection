import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
  listRelatedProducts,
} from '../actions/productActions';
import { listStockDetailsByProduct } from '../actions/stockAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Product from '../components/Home/Product';
import { addToCart } from '../actions/cartActions';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [imageUrl, setImageUrl] = useState('');
  const [stockColors, setStockColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState('');
  const [stockAvailable, setStock] = useState(0);

  

  const dispatch = useDispatch()

  const relatedProducts_ = useSelector((state) => state.relatedProducts);
  const { relatedProducts } = relatedProducts_;

    const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  
     const productStock = useSelector((state) => state.productStock);
     const { stock } = productStock;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

 

  useEffect(() => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        /* you can also use 'auto' behaviour
          in place of 'smooth' */
      });

    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch(listRelatedProducts(match.params.id));
      dispatch(listStockDetailsByProduct(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    setImageUrl(
      product?.images && product.images.length > 0
        ? product.images[0].url
        : '/images/sample.jpg'
    );
 
    if (stock.stocks != undefined && stock.stocks.length >0) {
      
      setSelectedSize(stock?.stocks[0].size);
      selectSize(stock?.stocks[0].size);
      setSelectedColor(stock?.stocks[0].color);
      setStock(stock?.stocks[0].count);
    }
   

  }, [dispatch, match, successProductReview, product, stock]);

  const addToCartHandler = () => {
  dispatch(addToCart(match.params.id, qty, selectedSize, selectedColor));

    history.push(`/cart/`)
  }
 

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

 
  const selectSize = (size) => {
    let findStocks = stock.stocks.filter((e) => e.size === size);
    setStockColors(findStocks);
    setSelectedSize(size);

    console.log(findStocks);
    if (findStocks.length === 0) {
      setStock(0)
      setQty(0)
    } else {
      setQty(1);
       setStock(findStocks[0].count);
    }
  }

  const selectColor = (color) => {
    setSelectedColor(color);
  }

  const changeQnt = (val) => {
   if (val === 'plus' && stockAvailable > qty) {
     setQty(qty + 1);
    }  
    
    if (val === 'minus' && qty > 0) {
      setQty(qty - 1);
    }
  }
  
    function numberWithCommasDecimal(num) {
      return num
        .toFixed(2)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    }


  return (
    <>
      <Link className="btn btn-light my-1" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row className="p-2">
            <Col md={6}>
              {' '}
              <div class="img-hover-zoom img-hover-zoom--zoom-n-pan">
                <Image src={imageUrl} alt={product.name} fluid />
              </div>
            </Col>
            <Col md={6}>
              {' '}
              <Row>
                <Col>
                  {' '}
                  <ListGroup variant="flush">
                    <ListGroup.Item className="product-head-text">
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className="product-price-text">
                      {' '}
                      {product.sellingPrice && numberWithCommasDecimal(
                        product.sellingPrice
                      )}{' '}
                      AED
                    </ListGroup.Item>
                    <ListGroup.Item className="product-description">
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              {stock.stocks != undefined && stock.stocks.length > 0 ? (
                <>
                  {' '}
                  <Row className="m-3">
                    <Col md={12}>
                      {' '}
                      <Row>
                        <Col md={2}>Size</Col>
                        <Col md={10}>
                          {' '}
                          {product?.stock &&
                            product.stock.length > 0 &&
                            product.stock.map((stock, index) => {
                              return (
                                <div
                                  className={
                                    selectedSize === stock.size
                                      ? 'dot stock-size mr-3 pointer underline'
                                      : 'dot stock-size mr-3 pointer'
                                  }
                                  key={index}
                                  onClick={() => selectSize(stock.size)}
                                >
                                  {stock.size}
                                </div>
                              );
                            })}{' '}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="m-3">
                    <Col md={12}>
                      {' '}
                      <Row>
                        <Col md={2}>Color</Col>
                        <Col md={10}>
                          {' '}
                          {stockColors &&
                            stockColors.length > 0 &&
                            stockColors.map((stock, index) => {
                              if (stock.count < 1) return;

                              return (
                                <span
                                  className={
                                    selectedColor === stock.color
                                      ? 'parent-dot'
                                      : ''
                                  }
                                  key={index}
                                >
                                  <div
                                    className="dot mr-2 pointer"
                                    key={index}
                                    style={{ backgroundColor: stock.color }}
                                    onClick={() => selectColor(stock.color)}
                                  ></div>
                                </span>
                              );
                            })}{' '}
                        </Col>
                      </Row>
                    </Col>
                  </Row>{' '}
                </>
              ) : (
                <div className="out-of-stock ">Out of stock</div>
              )}
              <Row className="m-3">
                <Col md={3} sm={12} xs={12}>
                  <div class="quantity buttons_added">
                    <input
                      type="button"
                      value="-"
                      class="minus"
                      onClick={(e) => changeQnt('minus')}
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
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                    <input
                      type="button"
                      value="+"
                      class="plus"
                      onClick={(e) => changeQnt('plus')}
                    />
                  </div>{' '}
                </Col>

                <Col md={9} sm={12}>
                  {' '}
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block product-screen-button"
                    type="button"
                    disabled={stockAvailable === 0 || qty <= 0}
                  >
                    Add To Cart
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          required={true}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required={true}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={8}>
              {' '}
              <Row className="justify-content-md-center">
                <Col md="auto">
                  {' '}
                  <h2>RELATED PRODUCTS</h2>
                </Col>
              </Row>
              <Row>
                {relatedProducts.slice(0, 3).map((item) => (
                  <Col sm={4} key={item._id}>
                    <Product product={item} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen
