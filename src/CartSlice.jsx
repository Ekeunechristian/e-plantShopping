import { createSlice } from '@reduxjs/toolkit';

// Create the CartSlice with reducers for managing cart state
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === newItem.name);
      if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      // Remove the item with the specified name from the cart
      state.items = state.items.filter(item => item.name !== itemName);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      // Find the item in the cart and update its quantity
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
        // Remove the item if quantity is zero
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// Export actions for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Selector to get the cart items
export const selectCartItems = (state) => state.cart.items;

// Export the reducer for the store
export default CartSlice.reducer;
