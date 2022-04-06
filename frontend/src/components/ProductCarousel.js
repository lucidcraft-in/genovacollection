import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
 
const ProductCarousel = () => {
 

  

 

 

  const slide = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/bnr-scaled.jpg`,
      name: 'A SRTIDE ',
    },
    
  ];

  return (
    <Carousel pause="hover">
      {slide.map((slide) => (
        <Carousel.Item key={slide._id}>
          <Image
            src={slide.image}
            alt={slide.name}
            fluid
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel
