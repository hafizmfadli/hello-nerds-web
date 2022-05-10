import React from "react";
import RegisterForm from "../components/RegisterForm";
import Box from "@mui/material/Box";

const Register = () => {
  return (
    <React.Fragment>
      <Box sx={{margin: "100px auto", display: "flex", justifyContent: "center"}}>
        <RegisterForm loginFormUrl="/account/login" />
      </Box>
    </React.Fragment>
  );
};

export default Register;
