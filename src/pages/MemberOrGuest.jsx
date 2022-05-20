import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GuestCheckoutForm from "../components/GuestCheckoutForm";

// User must have one or more book in their cart in order to fill
// Geus checkoutform. If they don't have then redirect to home page

const MemberOrGuest = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleMemberClicked = (e) => {
    navigate("/account/login");
  };

  const handleGuestCheckoutClicked = (e) => {
    setShowForm(true);
  };

  let dialog = (
    <Box
      sx={{
        textAlign: "center",
        border: "1px solid black",
        width: { xs: "80%", sm: "70%", md: "60%", lg: "40%" },
        padding: "30px",
        margin: "100px auto",
        backgroundColor: "white",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Typography variant="h4" component="div">
            Member or Guest Checkout ?
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleMemberClicked}>
            I'm Already a Member
          </Button>
          <Typography variant="caption" component="div">
            You don't have an account yet ?
            <Link to="/account/register">Register Here</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleGuestCheckoutClicked}>
            Continue with Guest Checkout
          </Button>
          <Typography variant="caption" component="div">
            By creating an Account, you will make future purchase faster and be
            able to keep track of your current and previous orders.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  let guestCheckoutForm = <GuestCheckoutForm />;

  let content = showForm ? guestCheckoutForm : dialog;

  return <React.Fragment>{content}</React.Fragment>;
};

export default MemberOrGuest;
