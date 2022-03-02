import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
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
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={imageUrl} variant="top" />
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
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            {' '}
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">aed {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product
