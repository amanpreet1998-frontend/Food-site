import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { food_list } from "../assets/assets";


const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};


const cartSlice = createSlice({
  name: 'cart',
   initialState: {items: [],
   totalAmount: 0,
    discountAmount: 0,
    finalAmount: 0,
    deliveryFee: 2,
    
   },
   

  reducers: {

    addToCart(state, action) {
      console.log('Before adding item:', JSON.parse(JSON.stringify(state.items)));
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalAmount = calculateTotalAmount(state.items);
      state.finalAmount = state.totalAmount;


      console.log('After adding item:', JSON.parse(JSON.stringify(state.items)));
    },

    removeFromCart(state, action) {
      const itemName = action.payload;
      state.items = state.items.filter((i) => i.name !== itemName);
      state.totalAmount = calculateTotalAmount(state.items);
      state.finalAmount = state.totalAmount;
      

    },


    decreaseQuantity(state, action) {
      const itemName = action.payload;
      const item = state.items.find((i) => i.name === itemName);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.name !== itemName);
        }
        state.totalAmount = calculateTotalAmount(state.items);
        state.finalAmount = state.totalAmount;
        

      }
    },


    increaseQuantity(state, action) {
      const itemName = action.payload;
      const item = state.items.find(i => i.name === itemName);
      if (item) {
        item.quantity += 1;
        state.totalAmount = calculateTotalAmount(state.items);
        state.finalAmount = state.totalAmount;
       

      }
    },

    applyPromoCode(state, action) {
      const promoCode = action.payload;
      let discount = 0;
      if (promoCode && promoCode === 'FIRSTUSER') {
        discount = state.totalAmount * 0.1; // 10% discount
        state.discountAmount = discount;
        state.finalAmount = Math.round((state.totalAmount - discount) * 100) / 100;
      } else {
        state.discountAmount = 0;
        state.finalAmount = state.totalAmount;
        toast.error('Promo code is not valid');
      }
      

    },
    clearCart(state) {
    state.items = [];
    state.totalAmount = 0;
    state.discountAmount = 0;
    state.finalAmount = 0;
  }
    },
  selectors: {
    selectItems: (state) => state.items,
    selectTotalAmount: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    selectFinalAmount: (state) => state.items.length > 0 ? state.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + state.deliveryFee - state.discountAmount : 0,
    selectDiscountAmount: (state) => state.discountAmount,
     selectIsCartEmpty: (state) => state.items.length === 0,

  },

})

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity, applyPromoCode, clearCart } = cartSlice.actions
export const { selectItems, selectTotalAmount, selectFinalAmount, selectDiscountAmount,selectIsCartEmpty} = cartSlice.selectors;


export default cartSlice.reducer;
