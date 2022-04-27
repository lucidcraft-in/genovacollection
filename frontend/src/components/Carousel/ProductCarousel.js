import React, { useEffect } from 'react'
 
import { Carousel, Image } from 'react-bootstrap'
import './Carousel.css';
 
 
const ProductCarousel = () => {
 

  

  const slide = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/images/slide1.jpeg`,
      name: 'Latest Collections ',
      class: 'desc-color-black head',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/images/slide2.jpeg`,
      name: 'Gents Fashion Sandals ',
      class: 'desc-color-wight head',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/images/slide3.jpeg`,
      name: 'A SRTIDE ',
      class: 'desc-color-wight head',
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
            className="img-style img easeload"
          />
          {/* <Carousel.Caption className="carousel-caption">
            <span className={slide.class}>{slide.name}</span>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel
