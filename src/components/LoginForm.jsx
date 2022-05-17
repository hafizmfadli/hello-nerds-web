import React from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AuthService from '../services/auth.service'
import { useNavigate } from "react-router-dom";


const LoginForm = ({ registerFormUrl }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();


  const onSubmit = async (data) => {
    // make HTTP request to login API endpoint
    let x = await AuthService.login(data.email, data.password)
    console.log('X :', x)
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "80%", md: "70%", lg: "50%" },
        padding: "50px",
        backgroundColor: "#f0f0f0",
        borderRadius: "20px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ color: "#ffae00" }}>Sign In to Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email: </label>
            <input
              style={{ width: "100%" }}
              {...register("email", { required: "Email can't be empty" })}
            />
            <p style={{ color: "red" }}>{errors.email?.message}</p>
          </div>
          <div>
            <label>Password: </label>
            <input
              style={{ width: "100%" }}
              {...register("password", { required: "Password can't be empty" })}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          </div>
          <div style={{ margin: "20px 0" }}>
            <input
              style={{
                width: "100%",
                backgroundColor: "#208dd6",
                color: "white",
                border: 0,
                padding: "8px",
                borderRadius: "10px",
              }}
              type="submit"
            />
          </div>
        </form>
        <Link to={registerFormUrl}>
          You don't have an account yet? Register here
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
