import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Row, Container, Carousel, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import User1 from '../assets/Food_Assets/assets/blog/review-author-1.jpg'
import User2 from '../assets/Food_Assets/assets/blog/review-author-2.jpg';
import User3 from '../assets/Food_Assets/assets/blog/review-author-3.jpg';
import ratingg from '../assets/rating_starts.png';

function ReviewPage() {

  return (
    <>
<div className='blog'>
        <Container>
          <Row>
            <Carousel >
              <Carousel.Item>
                <img
                  className="img-fluid"
                  src={User1}
                  alt="First slide"
                />
                <div className='blog-content'>
                  <p>Love this website! The food is always fresh and delicious, and the delivery is so fast. Highly recommend!</p>
                  <h5>By Annie</h5>
                  <img src={ratingg} />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-fluid"
                  src={User2}
                  alt="Second slide"
                />
                <div className='blog-content'>
                  <p>Best food ordering experience ever! The website is easy to use, and the customer service is top-notch</p>
                  <h5>By Amelie</h5>
                  <img src={ratingg} />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-fluid"
                  src={User3}
                  alt="Third slide"
                />
                <div className='blog-content'>
                  <p>I've tried many food ordering websites, but this one is my favorite. The variety of options is amazing, and the food is always hot and tasty.</p>
                  <h5>By John</h5>
                  <img src={ratingg} />
                </div>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
      </div>
      <section className="contact_section mt-5">
        <Container>
          <Row className="justify-content-center">
            <Col sm={8} className="text-center">
              <h4>We Guarantee</h4>
              <h2>30 Minutes Delivery!</h2>
              <p>
                30 minutes delivery time. Your food will be delivered to your doorstep within 30 minutes of order confirmation. Track your order in real-time for updates on preparation and delivery.
              </p>
              <Link to="/" className="contact-button btn btn-danger">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => console.log('hover started!')}>Call: 999-888-7777</motion.button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default ReviewPage;