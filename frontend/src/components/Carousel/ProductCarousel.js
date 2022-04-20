import React, { useEffect } from 'react'
 
import { Carousel, Image } from 'react-bootstrap'
import './Carousel.css';
 
 
const ProductCarousel = () => {
 

  

  const slide = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/bnr-scaled.jpg`,
      name: 'A SRTIDE ',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/slide2.jpeg`,
      name: 'A SRTIDE ',
    },
  ];

  return (
    <Carousel pause="hover" className="carousel-div">
      {slide.map((slide) => (
        <Carousel.Item key={slide._id}>
          <Image
            src={slide.image}
            alt={slide.name}
            // className="img-fluid"
            className="img-style"
          />
          {/* <Carousel.Caption className="carousel-caption">
            <span className='head'>
             name
            </span>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel
