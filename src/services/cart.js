import { LOCAL_STORAGE_CART_KEY } from '../AppConst'

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || []
  }

  // Add book to cart and store in browser's local storage
  Add(book, quantity) {

    let idx = this.items.findIndex(item => item.book.id === book.id)
    if (idx > -1){
      // already in the cart
      if(this.items[idx].quantity + quantity <= this.items[idx].book.stock){
        // User added same book to the cart.
        // So we only need to update quantity
        this.items[idx].quantity += quantity
      }else {
        // user add book quantity to the cart exceed available stock
        return false
      }
    }else {
      this.items.push({book, quantity})
    }

    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(this.items))
    
    return true
  }
  AddAsync(book, quantity) {
    // Send cart data to server
    // send token as request body
  }
  fetch() {
    // fetch user's cart 
    // send token as request body
  }
  isInCart(bookId) {
    return this.items.find(item => item.book.id === bookId) ? true : false
  }
  isCustomerReachMax(bookId) {
    let bookInCart = this.items.find(item => item.book.id === bookId)
    return bookInCart.quantity === bookInCart.book.stock
  }
  isExceedStock(bookId, quantity){
    let inCart = this.items.find(item => item.book.id === bookId)
    if((inCart.book.quantity + quantity) > inCart.book.stock){
      return true
    }
    return false
  }
  sumAllQuantity() {
    let qty = this.items.reduce((prev, curr) => prev + curr.quantity, 0)
    return qty
  }
  removeItem(bookId){
    this.items = this.items.filter(item => item.book.id !== bookId)
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(this.items))
    console.log(this.items)
  }
}

export default new Cart();