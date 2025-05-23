import React, { useContext, useState, useEffect } from 'react';
import { menu_list } from '../assets/assets';
import { motion } from "framer-motion";
import Fooditem from './Fooditem';
import '../components/style/Menu.css';
import { CiSearch } from "react-icons/ci";
import { StoreContext } from '../context/StoreContext';

const Menu = () => {

  const [category, setCategory] = useState("All");

  const { food_list } = useContext(StoreContext);


  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoodList = food_list.filter((item) => {
    const matchesCategory = category === 'All' || category === item.category;
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <>
      <div className='menu' id="menu" >
         <img className='menu-line' src='https://img.freepik.com/free-vector/abstract-background-vector-illustration_460848-11793.jpg?ga=GA1.1.316581448.1737552035&semt=ais_hybrid&w=740'/>
        <motion.h1
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log('hover started!')}
        >Explore our menu</motion.h1>
        <h6 className='menuu'>Choose from a diverse menu featuring a delectable array of dishes.Our mission is to satisfy your<br />
          cravings and elevate your dining experience, one delicious meal at a time.
        </h6>
        <div className="menu-list">
          {menu_list.map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => console.log('hover started!')}
              whileTap={{ scale: 0.6 }}
              onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
              key={index}
              className="menu-list-item"
            >
              <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </motion.div>
          ))}
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="     Search food items"
          className='search-border p-3'
        />
        <hr />
        <div className="food-display" id="food-display">
          <h2>Top dishes near you</h2>
          <div className="food-display-list ">
            {filteredFoodList.map((item, index) => (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default Menu;