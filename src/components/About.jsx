import React from 'react';
import { motion } from "framer-motion";
import deliveryBike from '../assets/Food_Assets/assets/about/delivery-bike.png';
import food from '../assets/Food_Assets/assets/about/pizza.png';
import time from '../assets/time.png';
import '../components/style/About.css';
import Home from './Home';

const About = () => {

  return (
    <>
      <div className='about'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 1 / 10
          }}
        >
          <motion.h3 whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log('hover started!')} className=' text-center '>A few words</motion.h3><br />
          <motion.h1 whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log('hover started!')} className='text-center'>About us</motion.h1>
        </motion.div>

        <div className='bg_parallax_scroll'>
          <motion.h2
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log('hover started!')}
            className='font-bold text-center'>We’re passionate<br /> about<br /> our food</motion.h2>
        </div>
        <div className='delivery flex justify-between grid-cols-3 gap-1'>
          <div>
            <motion.img whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log('hover started!')} src={deliveryBike} />
            <h4>Free Shipping on<br />
              First Order</h4><br />
            <p>Enjoy free shipping on <br />your first order! <br />
            </p>
          </div>
          <div>
            <motion.img whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log('hover started!')} src={food} />
            <h4>Variety of<br />
              Dishes</h4><br />
            <p>Explore our extensive menu,<br /> featuring a wide variety<br /> of dishes to suit every taste and craving.
            </p>
          </div>
          <div>
            <motion.img whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log('hover started!')} src={time} />
            <h4>Thirty Minutes<br />
              Delivery</h4><br />
            <p>Get your food delivered in 30 minutes<br /> or less<br />  - fast, fresh, and delicious.</p>
          </div>
        </div>
        <p className='about-para'>Food is more than just sustenance to us <br />- it's a way to connect, share, and create memories.<br />
          Our team is dedicated to serving up<br /> more than just a meal - we're passionate about delivering<br />
          an experience that will<br /> leave you feeling nourished and inspired.<br />...</p>

      </div>
    </>
  )
}

export default About;