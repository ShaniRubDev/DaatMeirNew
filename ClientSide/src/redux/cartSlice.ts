// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DonationOption } from '../models/DonationOption';

interface CartState {
  cartItems: DonationOption[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // פעולה להוספת תרומה לעגלה
    // addToCart: (state, action: PayloadAction<DonationOption>) => {
    //     console.log(`add to cart`+action.payload)
    //   state.cartItems.push(action.payload);
    // },
    addToCart: (state, action: PayloadAction<DonationOption>) => {
        console.log("add to cart", action.payload);
        state.cartItems = [...state.cartItems, action.payload]; // החזרת עותק חדש
        console.log(state.cartItems.length)
      },
    // פעולה לניקוי העגלה
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems.splice(action.payload, 1);
    },
  },
});

export const { addToCart, clearCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
