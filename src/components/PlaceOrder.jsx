import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import '../components/style/PlaceOrder.css';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';/*change*/
import { useDispatch } from 'react-redux';/*change*/


const PlaceOrder = () => {

  const navigate = useNavigate();
const dispatch = useDispatch();/*change*/
const [errors, setErrors] = useState({});/*change*/
  
  const { items } = useSelector((state) => state.cart);
  console.log('Cart items:', items);

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const discountAmount = useSelector((state) => state.cart.discountAmount);
  const finalAmount = useSelector((state) => state.cart.finalAmount);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setStateValue] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const validateForm = () => {
  const newErrors = {};

  // Required fields check
  if (!firstName.trim()) newErrors.firstName = 'First name is required';
  if (!lastName.trim()) newErrors.lastName = 'Last name is required';
  if (!email.trim()) newErrors.email = 'Email is required';
  if (!street.trim()) newErrors.street = 'Street is required';
  if (!city.trim()) newErrors.city = 'City is required';
  if (!state.trim()) newErrors.state = 'State is required';
  if (!zipCode.trim()) newErrors.zipCode = 'Zip code is required';
  if (!country.trim()) newErrors.country = 'Country is required';
  if (!phone.trim()) newErrors.phone = 'Phone number is required';

  // Format validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    newErrors.phone = 'Phone number must be exactly 10 digits';
  }

  if (zipCode && !/^\d+$/.test(zipCode)) {
    newErrors.zipCode = 'Zip code must contain numbers only';
  }

  if (state && !/^[A-Za-z\s]+$/.test(state)) {
    newErrors.state = 'State must contain letters only';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const message = (e) => {
    e.preventDefault();
    console.log('Button clicked');

    if (items.length === 0) {
      console.log('Cart is empty');

      toast.error('Your cart is empty', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });}
    else if (validateForm()) {
      toast.success('Order placed successfully', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        dispatch(clearCart());/*change*/
        navigate('/cart', { state: { orderPlaced: true } });/*change*/
      }, 2000);
    } else {
      console.log('Not all fields filled');
      toast.error('Please fix the form errors', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
    <>
      <form className='place-order'>
        <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
          <div className='multi-fields'>
            <input type='text' placeholder='First name' value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
            <input type='text' placeholder='Last name' value={lastName}
              onChange={(e) => setLastName(e.target.value)} required />
             {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <input type='email' placeholder='Email address' value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          {errors.email && <span className="error">{errors.email}</span>}
          <input type='text' placeholder='Street' value={street}
            onChange={(e) => setStreet(e.target.value)}
            required />
          {errors.street && <span className="error">{errors.street}</span>}
          <div className='multi-fields'>
            <input type='text' placeholder='City' value={city}
              onChange={(e) => setCity(e.target.value)}
              required />
            {errors.city && <span className="error">{errors.city}</span>}
            <input type='text' placeholder='State' value={state}
              onChange={(e) => setStateValue(e.target.value)}
              required />
            {errors.state && <span className="error">{errors.state}</span>}
          </div>
          <div className='multi-fields'>
            <input type='text' placeholder='Zip Code' value={zipCode}
              onChange={(e) => setZipCode(e.target.value)} required />
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}
            <input type='text' placeholder='Country' value={country}
              onChange={(e) => setCountry(e.target.value)} required />
             {errors.country && <span className="error">{errors.country}</span>}
          </div>
          <input type='tel' placeholder='Phone' value={phone}
            onChange={(e) => setPhone(e.target.value)}
             pattern='[0-9]{10}'/*change*/
      title='Phone number must be 10 digits'/*change*/
            required />
           {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className='place-order-right'>
          <div className='cart-total'>
            <h2>Cart total</h2>
            <div>
              <div className='cart-total-details'><p>Subtotal</p>
                <p>{totalAmount}</p></div><hr />
              <div className='cart-total-details'><p>Delivery Fee</p>
                <p>{2}</p></div><hr />
              <div className='cart-total-details'><p>Total</p>
                <p>{totalAmount + 2}</p></div><hr />
              <div className='cart-total-details'><p>Discount</p>
                <p>{discountAmount}</p></div><hr />
              <div className='cart-total-details'><b>Final Amount to pay </b>
                <b>{finalAmount + 2}</b>
              </div>
            </div>
            <button type='button' onClick={message}>PLACE ORDER</button>
          </div>
        </div>
        <ToastContainer />
      </form>

    </>
  )
}

export default PlaceOrder;
