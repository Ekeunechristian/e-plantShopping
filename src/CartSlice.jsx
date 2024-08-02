import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push(newItem);
      }
    },
    
    // Remove an item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload.name;
      state.items = state.items.filter(item => item.name !== itemName);
    },
    
    // Update the quantity of an existing item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      
      if (item) {
        if (quantity <= 0) {
          // If the quantity is 0 or less, remove the item from the cart
          state.items = state.items.filter(item => item.name !== name);
        } else {
          // Otherwise, update the item's quantity
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export const selectCartItems = state => state.cart.items;
export default CartSlice.reducer;
