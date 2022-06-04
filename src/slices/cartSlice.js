import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_CART_KEY } from '../AppConst'

// We store user's cart data in browser's local storage.
const storedCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY))

// If there's no cart data in user's browser local storage
// we set initial cart state with empty array
const initialState = storedCart ? storedCart : []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    bookAdded(state, action) {
      let idx = state.findIndex(item => item.book.id === action.payload.book.id)
      if (idx > -1) {
        // already in the cart. Only update quantity value
        state[idx].quantity += action.payload.quantity
      } else {
        state.push(action.payload)
      }
    },
    bookRemoved(state, action){
      let idx = state.findIndex(item => item.book.id === action.payload)
      if (idx > -1){
        state.splice(idx, 1)
      }
    },
    bookSetQty(state, action){
      let idx = state.findIndex(item => item.book.id === action.payload.book.id)
      if (idx > -1){
        state[idx].quantity = action.payload.quantity
      }
    },
    cartSetup(state, action){
      state.splice(0, state.length, ...action.payload)
    }
  }
})

// createSlice will provide action creator by default.
// So we only need to export it.
export const { bookAdded, bookRemoved, bookSetQty, cartSetup } = cartSlice.actions

// Selector for extract cart state
export const selectCart = state => state.cart

// Selector for extract cart state and sum all quantity
export const sumCartQuantity = state => state.cart.reduce((prev, curr) => prev + curr.quantity, 0)

export default cartSlice.reducer