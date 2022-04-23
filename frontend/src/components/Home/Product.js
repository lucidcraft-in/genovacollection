import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap';
import Rating from '../Rating'
import Container from 'react-bootstrap/Container';
 
import '../../screens/Home/Home.css'

const Product = ({ product }) => {

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {

  setImageUrl(
    product.images.length > 0 ? product.images[0].url : '/images/sample.jpg'
  );
  }, [product]);


  const changeColor = (image) => {
    setImageUrl(image.url)
  }
   

  function numberWithCommasDecimal(num) {
    return num
    
      // .toFixed(2)
      // .toString()
      // .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Card className="my-3 product-list-padding rounded bg-image ">
      {product.price > product.sellingPrice && product.sellingPrice != 0 ? (
        <Container>
          <Row>
            <Col xs> </Col>
            <Col xs={{ order: 12 }}>
              {' '}
              <span class="badge badge-danger">SALE</span>
            </Col>
            <Col xs={{ order: 1 }}> </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col xs> </Col>
            <Col xs={{ order: 12 }}> &nbsp;</Col>
            <Col xs={{ order: 1 }}> </Col>
          </Row>
        </Container>
      )}

      <Link to={`/product/${product._id}`}>
        <Card.Img src={imageUrl} variant="top" className="zoom" />
      </Link>

      <Card.Body>
        <div className="d-flex justify-content-center m-1">
          {' '}
          {product.images.length > 0 &&
            product.images.map((image, index) => {
              return (
                <div
                  className="dot mr-1 pointer"
                  key={index}
                  style={{ backgroundColor: image.color }}
                  onClick={() => changeColor(image)}
                ></div>
              );
            })}{' '}
        </div>{' '}
        <Link to={`/product/${product._id}`} className="decoration-none">
          <Card.Title as="div" className="product-head-text  text-center">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as="div" className="product-head-text text-center">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}
        <Row className="product-price-text">
          <Col className="text-center ">
            {product.price > product.sellingPrice &&
            product.sellingPrice != 0 ? (
              <span className=" strike mr-2">
                {numberWithCommasDecimal(product.price)} AED{' '}
              </span>
            ) : (
              ''
            )}
            {numberWithCommasDecimal(product.sellingPrice)} AED
          </Col>

          {/* <Col className="text-center"> {product.sellingPrice} AED</Col> */}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Product
