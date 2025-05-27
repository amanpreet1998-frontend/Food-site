import React, { useState, useEffect, useContext } from 'react';
import '../components/style/Cart.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeFromCart, decreaseQuantity, increaseQuantity } from '../redux/CartSlice';
import { applyPromoCode } from '../redux/CartSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { selectItems, selectTotalAmount, selectFinalAmount, selectDiscountAmount, selectIsCartEmpty } from '../redux/CartSlice';
import { useLocation } from 'react-router-dom';/*change*/


const auth = getAuth();


const Cart = () => {

  const [promoCode, setPromoCode] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const totalAmount = useSelector(selectTotalAmount);
  const finalAmount = useSelector(selectFinalAmount);
  const discountAmount = useSelector(selectDiscountAmount);

  const isCartEmpty = useSelector(selectIsCartEmpty);

  //    if (isCartEmpty) {
  //   return <p>Your cart is empty</p>;
  // }



  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };
  const handleApplyPromoCode = () => {
    dispatch(applyPromoCode(promoCode));

  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  const handleCheckout = () => {
    if (!loading && isLoggedIn) {
      navigate('/order');
    } else {
      navigate('/login');
    }
  };

const location = useLocation();/*change*/
const orderPlaced = location.state?.orderPlaced;/*change*/



  return (
    <>
      <div className='cart'>
        {orderPlaced && (/*change*/
  <div className="order-success-message" >
    ✅ Your order has been placed successfully!
  </div>
)}
        <div className='cart-item'>


          <div className='cart-item-title'>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p></p>
          </div>
          <br />
          <hr />

          {isCartEmpty ? (
            <img  className='empty-cart' src='https://img.freepik.com/premium-vector/modern-design-concept-no-product-found-cart-design_637684-219.jpg?ga=GA1.1.316581448.1737552035&semt=ais_hybrid&w=740' style={{ height: "500px", width: "500px" }} />

          ) :
            (items.map((item, index) => (
              <div key={index}>
                <div className="cart-item-title cart-items-item">
                  <img src={item.image} alt="" className='cart-img' />
                  <p>{item.name}</p>
                  <p> <span>&#x20B9;</span> {item.price} </p>
                  <p>{item.quantity}</p>
                  <p> <span>&#x20B9;</span> {item.price * item.quantity} </p>
                  <div className='flex gap-2'>
                    <button onClick={() => handleIncreaseQuantity(item.name)} className="add" >
                      +
                    </button>
                    <button onClick={() => handleDecreaseQuantity(item.name)} className="sub" >
                      -</button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.name)} className="mul">
                    Remove
                  </button>
                </div>
              </div>
            )))}




        </div>
        {!isCartEmpty && (
          <div className='cart-bottom'>
            <div className='cart-total'>
              <h2>Cart total</h2>
              <div>
                <div className='cart-total-details'><p>Subtotal</p>
                  <p>{totalAmount}</p></div><hr />
                <div className='cart-total-details'><p>Delivery Fee</p>
                  <p>{2}</p></div><hr />
                <div className='cart-total-details'><p>Total</p>
                  <p>{totalAmount}</p></div><hr />
                <div className='cart-total-details'><p>Discount</p>
                  <p>{discountAmount}</p></div><hr />
                <div className='cart-total-details'><b>Final Amount to pay </b>
                  <b>{finalAmount}</b>
                </div>
              </div>
              <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </div>
            <div className='cart-promocode'>
              <div>
                <p className='m-4-lg  fs-4 fw-bold'>If you have a promocode, Enter it here</p>
                <div className='cart-promocode-input'>
                  <input type='text' placeholder='            promocode' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <button onClick={handleApplyPromoCode}>Submit</button>
                </div>
                <p className='m-5 fs-4'><i>New to our website? Get 10% off on your first order with promocode</i> <b className='text-danger'>FIRSTUSER!</b> </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart;
