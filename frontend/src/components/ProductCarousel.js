import React, { useEffect } from 'react'
 
import { Carousel, Image } from 'react-bootstrap'
 
 
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
    <Carousel pause="hover">
      {slide.map((slide) => (
        <Carousel.Item key={slide._id}>
          <Image src={slide.image} alt={slide.name} fluid className="img-fluid" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel
