import { createSlice } from '@reduxjs/toolkit';

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined; // Let the reducer initialize
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined; // Let the reducer initialize
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

// Load the initial state from local storage, or use the default initial state
const initialState = loadState() || {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('Adding to cart:', action.payload); // Log the product being added
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
        console.log('Item quantity updated:', existingItem); // Log item if quantity is updated
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        console.log('New item added:', state.items[state.items.length - 1]); // Log new item if added
      }
      state.total = state.items.reduce((sum, item) => {
        const itemPrice = item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price; // Use discounted price if available
        return sum + itemPrice * item.quantity; // Calculate total using itemPrice
      }, 0);
      console.log('Cart state after adding:', state); // Log the entire cart state
      // Save state after modification
      saveState(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      // Save state after modification
      saveState(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        // Save state after modification
        saveState(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      // Save state after modification
      saveState(state);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 