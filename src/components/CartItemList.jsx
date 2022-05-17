import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CartItem from "./CartItem";
import Grid from "@mui/material/Grid";
import { cartsDummy } from "../data";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import AuthService from "../services/auth.service";
import CartService from "../services/cart";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, bookRemoved, bookSetQty } from "../slices/cartSlice";

const CartItemList = () => {
  let cart = useSelector(selectCart);
  const [cartItems, setCartItems] = useState(cart);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // cartItems source is from API or browser's local storage
    // if user have logged in then you can get cartItems from API
    // otherwise from browser's local storage
    if (AuthService.isLoggedIn()) {
      //  send HTTP request to API cart
    }
    setIsFirstRender(false);
  }, []);

  // fired when decrement button quantity clicked
  const handleDecrement = (cartItem) => {
    // we can't decrement anymore when we only have one quantity for particular product in our cart
    if (cartItem.quantity > 1) {
      // todo: make helpers function to make deep copy array of objects
      let updatedCartItem = { ...cartItem, quantity: cartItem.quantity - 1 };
      let updatedCartItems = [];
      cartItems.forEach((item) => {
        if (item.book.id === cartItem.book.id) {
          updatedCartItems.push(updatedCartItem);
        } else {
          updatedCartItems.push({ ...item });
        }
      });
      setCartItems(updatedCartItems);

      // dispatch action to redux store
      dispatch(bookSetQty({ ...updatedCartItem }));
    }
  };

  // fired when increment button quantity clicked
  const handleIncrement = (cartItem) => {
    // we only can added more product quantity to our cart when product stock is sufficient
    if (cartItem.book.stock > cartItem.quantity) {
      // todo: make helpers function to make deep copy array of objects
      let updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1 };
      let updatedCartItems = [];
      cartItems.forEach((item) => {
        if (item.book.id === cartItem.book.id) {
          updatedCartItems.push(updatedCartItem);
        } else {
          updatedCartItems.push({ ...item });
        }
      });
      setCartItems(updatedCartItems);

      // dispatch action to redux store
      dispatch(bookSetQty({ ...updatedCartItem }));
    }
  };

  // fired when remove button for particular product clicked
  const handleRemoveCartItems = (cartItem) => {
    // TODO: make API call to remove particular cartItem (only for user that has been logged into the system)
    if (AuthService.isLoggedIn()) {
      // Send HTTP request to remove particular item from the cart
    }
    // remove particular item from local storage cart data
    CartService.removeItem(cartItem.book.id);

    // dispatch action to redux store to remove particular item from the cart
    dispatch(bookRemoved(cartItem.book.id));

    // When component dispatch action to redux store
    // then the redux store will automatically "inform" all component who
    // interest in particular state that state has beed chaged. So the component should'nt
    // update manually like this. But idk why this component is not re-render when action is dispatched ._.
    // So, we update state manually.
    setCartItems((prevState) =>
      prevState.filter((item) => item.book.id !== cartItem.book.id)
    );
  };

  // fired when checkout button clicked
  const handleCheckout = () => {
    console.log(
      "GOTO GUEST SHIPPING ADDRESS || Option to choose member or guest checkout"
    );
  };

  // fire when continue shopping button clicked
  const handleContinueShopping = () => {
    console.log("GOTO HOME PAGE");
  };

  let content;
  if (cartItems.length > 0) {
    // calculate total price
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.book.price * item.quantity;
    });
    content = (
      <Grid container direction="column" spacing={8}>
        {/* cart items */}
        {cartItems.map((item, i) => (
          <Grid item key={i}>
            <CartItem
              item={item}
              onIncrementItemQty={() => handleIncrement(item)}
              onDecrementItemQty={() => handleDecrement(item)}
              onRemove={() => handleRemoveCartItems(item)}
            />
          </Grid>
        ))}
        {/* cart info and action */}
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center" },
              justifyContent: { sm: "space-between" },
            }}
          >
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px 15px",
              }}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
            <Box sx={{ width: { xs: "80%", sm: "30%" }, textAlign: "center" }}>
              <hr></hr>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Rp {totalPrice}</Typography>
                </Grid>
              </Grid>
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "15px",
                  width: "100%",
                  margin: "20px 0",
                }}
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    content = <Typography variant="h6">Cart is Empty</Typography>;
  }

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
          padding: "20px 10px",
        }}
      >
        {content}
      </Paper>
    </Box>
  );
};

export default CartItemList;
