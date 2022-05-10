import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CartItem from "./CartItem";
import Grid from "@mui/material/Grid";
import { cartsDummy } from "../data";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const CartItemList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // cartItems source is from API or browser's local storage
    // if user have logged in then you can get cartItems from API
    // otherwise from browser's local storage
    setCartItems(cartsDummy);
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
        if (item.product.id === cartItem.product.id) {
          updatedCartItems.push(updatedCartItem);
        } else {
          updatedCartItems.push({ ...item });
        }
      });
      setCartItems(updatedCartItems);
    }
  };

  // fired when increment button quantity clicked
  const handleIncrement = (cartItem) => {
    // we only can added more product quantity to our cart when product stock is sufficient
    if (cartItem.product.stock > cartItem.quantity) {
      // todo: make helpers function to make deep copy array of objects
      let updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1 };
      let updatedCartItems = [];
      cartItems.forEach((item) => {
        if (item.product.id === cartItem.product.id) {
          updatedCartItems.push(updatedCartItem);
        } else {
          updatedCartItems.push({ ...item });
        }
      });
      setCartItems(updatedCartItems);
    }
  };

  // fired when remove button for particular product clicked
  const handleRemoveCartItems = (cartItem) => {
    // TODO: make API call to remove particular cartItem (only for user that has been logged into the system)
    let filteredCartItems = cartItems.filter(
      (item) => item.product.id !== cartItem.product.id
    );
    setCartItems(filteredCartItems);
  };

  // fired when checkout button clicked
  const handleCheckout = () => {
    console.log("GOTO GUEST SHIPPING ADDRESS || Option to choose member or guest checkout")
  }

  // fire when continue shopping button clicked
  const handleContinueShopping = () => {
    console.log("GOTO HOME PAGE")
  }

  let content;

  if (isFirstRender) {
    // This is "trick" to not display message "Cart Is Empty" at first render
    content = <CircularProgress />;
  } else {
    if (cartItems.length > 0) {
      // calculate total price
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += item.product.price * item.quantity;
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
                justifyContent: {sm: "space-between"}
              }}
            >
              <button style={{ backgroundColor: "black", color: "white", padding: "10px 15px" }} onClick={handleContinueShopping}>
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
                    margin: "20px 0"
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
