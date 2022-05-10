import React from "react";
import LoginForm from "../components/LoginForm";
import Box from "@mui/material/Box";

const Login = () => {
  return (
    <Box sx={{margin: "100px auto", display: "flex", justifyContent: "center"}}>
      <LoginForm registerFormUrl="/account/register" />
    </Box>
  );
};

export default Login;
