import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap';
import Rating from '../Rating'
 
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
   
  return (
    <Card className="my-3 p-3 rounded bg-image  ">
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
        </div>
        <Link to={`/product/${product._id}`} className="decoration-none">
          <Card.Title as="div" className="product-head-text">
            {' '}
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="product-head-text">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Row className="product-price-text">
          {product.price > product.sellingPrice ? (
            <Col className="text-center strike"> {product.price} AED</Col>
          ) : (
            ''
          )}
          <Col className="text-center"> {product.sellingPrice} AED</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Product
