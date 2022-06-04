import ValidationError from "./ValidationError";

class MaxCartItemError extends ValidationError {
  constructor() {
    super("You can't add more quantity because your cart item quantity for this book has been reach or exceed available stock")
  }
}

export default MaxCartItemError