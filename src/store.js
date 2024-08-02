// store.js

// Import the necessary functions and files
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx'; // Adjust the path if necessary

// Configure the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer, // Associate the cart reducer with the 'cart' slice of state
  },
});

// Export the configured store
export default store;
