import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CustomCarousel.css'; 

function CustomCarousel() {
  return (
    <Carousel fade interval={3000} className="custom-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/photos/img4.jpg"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/photos/6.jpg"
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/photos/img5.jpg"
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomCarousel;
