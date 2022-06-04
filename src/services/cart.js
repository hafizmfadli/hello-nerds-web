import { LOCAL_STORAGE_CART_KEY } from '../AppConst'
import axios from 'axios'
import MaxCartItemError from '../errors/MaxCartItemError'
import HttpError from '../errors/HttpError'

const API_URL = process.env.REACT_APP_HELLO_NERDS_API_BASE_URL + "/v1"

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || []
  }

  // Add book to cart and store in browser's local storage
  Add(book, quantity) {

    let idx = this.items.findIndex(item => item.book.id === book.id)
    if (idx > -1) {
      // already in the cart
      if (this.items[idx].quantity + quantity <= this.items[idx].book.stock) {
        // User added same book to the cart.
        // So we only need to update quantity
        this.items[idx].quantity += quantity
      } else {
        // user add book quantity to the cart exceed available stock
        return false
      }
    } else {
      this.items.push({ book, quantity })
    }

    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(this.items))

    return true
  }
  async AddAsync(token, book, quantity, userID) {
    // Send cart data to server
    // send token as request body
    try {
      // send HTTP request to add cart data to a database
      await axios.post(
        `${API_URL}/carts/add-to-cart`,
        {
          user_id: userID,
          quantity,
          updated_edited_id: book.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      throw new HttpError(err.response.status, err.message)
    }
  }
  async SetNewQuantityAsync(token, book, quantity, userID) {
    try {
      const response = await axios.put(`${API_URL}/carts/setQuantity`, {
        quantity
      }, {
        params: {
          user_id: userID,
          updated_edited_id: book.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      throw new HttpError(err.response.status, err.message)
    }
  }
  async updateCartAsync(token, book, quantity, userID) {
    // is useh already have this book in their cart?
    let cart = []
    try {
      cart = await this.fetch(token, userID)
    } catch (err) {
      throw new HttpError(err.response.status, err.message)
    }
    console.log("CART 1 : ", cart)
    const cartItem = cart.find(item => item.book.id === book.id)

    if (cartItem) {
      // this user already have this book in their cart
      // So, we only need to update quantity for that book
      if ((cartItem.quantity + quantity) > book.stock) {
        throw new MaxCartItemError()
      }

      try {
        await this.SetNewQuantityAsync(token, book, cartItem.quantity + quantity, userID)
      } catch (err) {
        throw new HttpError(err.response.status, err.message)
      }
    } else {
      try {
        await this.AddAsync(token, book, quantity, userID)
      } catch (err) {
        throw new HttpError(err.response.status, err.message)
      }
    }

    try {
      cart = this.fetch(token, userID)
    } catch (err) {
      throw new HttpError(err.response.status, err.message)
    }

    return cart
  }
  async fetch(token, userID) {
    // fetch user's cart 
    // send token as request body
    try {
      const response = await axios.get(`${API_URL}/users/${userID}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let carts = response.data.carts
      if (!carts){
        carts = []
      }
      return carts
    } catch (err) {
      throw new HttpError(err.response.status, err.message)
    }
  }
  isInCart(bookId) {
    return this.items.find(item => item.book.id === bookId) ? true : false
  }
  isCustomerReachMax(bookId) {
    let bookInCart = this.items.find(item => item.book.id === bookId)
    return bookInCart.quantity === bookInCart.book.stock
  }
  isExceedStock(bookId, quantity) {
    let inCart = this.items.find(item => item.book.id === bookId)
    if ((inCart.book.quantity + quantity) > inCart.book.stock) {
      return true
    }
    return false
  }
  sumAllQuantity() {
    let qty = this.items.reduce((prev, curr) => prev + curr.quantity, 0)
    return qty
  }
  removeItem(bookId) {
    this.items = this.items.filter(item => item.book.id !== bookId)
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(this.items))
    console.log(this.items)
  }
  remove() {
    localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
  }
  async guestCheckout(ShippingAddress) {
    const cartData = []
    this.items.forEach(item => {
      cartData.push({ updated_edited_id: item.book.id, quantity: item.quantity })
    })
    try {
      await axios.post(API_URL + "/checkout", {
        carts: cartData,
        shipping_address: ShippingAddress,
        address_variety: 0,
        checkout_type: 0
      })
    } catch (err) {
      throw err
    }
  }
  async removeCartAsync(userID, token, bookID) {
    try {
      await axios.delete(API_URL +  "/carts/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            user_id: userID,
            updated_edited_id: bookID
          }
        }
      )
    } catch (err) {
      throw err
    }
  }
}

export default new Cart();