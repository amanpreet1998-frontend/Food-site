import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets';
import '../components/style/Fooditem.css';
import { StoreContext } from '../context/StoreContext';
import { motion } from "framer-motion";
import { food_list } from '../assets/assets';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartSlice';
import { toast, ToastContainer } from 'react-toastify';


const Fooditem = ({ _id, name, price, description, image }) => {

  const { searchTerm, setSearchResults } = useContext(StoreContext);

  useEffect(() => {
    const filteredResults = food_list.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(filteredResults);
  }, [searchTerm, setSearchResults]);

  const { searchResults } = useContext(StoreContext);


  const dispatch = useDispatch();


  const handleAddToCart = () => {
    console.log('Adding item to cart:', { _id, name, price, image });

    dispatch(addToCart({ _id, name, price, image }));
    toast.success('Item added to cart!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      
    });

  };

return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => console.log('hover started!')}
        className='food-item'>
        <div className='food-item-img-container'>
          <img className='food-item-image' src={image} alt='food-item-image' />
        </div>
        <div className='food-item-info'>
          <button type="button" className="card-button btn btn-outline-warning fw-bold fs-4 ms-4 m-3" onClick={handleAddToCart}>Add to Cart</button>

          <div className='food-item-name-rating'>
            <p>{name}</p>
            <img src={assets.rating_starts} alt='' />
          </div>
          <p className='food-item-description'>{description}</p>
          <p className='food-item-price'><span>&#x20B9;</span>{price}</p>
        </div>
        <ToastContainer />
      </motion.div>


    </>
  )
}

export default Fooditem;
