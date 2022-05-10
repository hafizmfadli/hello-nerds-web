import React from 'react'
import Navbar from '../components/Navbar'
import CartItemList from '../components/CartItemList'
import {productsDummy} from "../data"

const Cart = () => {
  return (
    <React.Fragment>
      <Navbar />
      <CartItemList />
    </React.Fragment>
  )
}

export default Cart