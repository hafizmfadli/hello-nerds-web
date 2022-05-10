import React from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const RegisterForm = ({ loginFormUrl }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // make HTTP request to register API endpoint
    console.log(data);
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
        <h2 style={{ color: "#ffae00" }}>Account Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email: </label>
            <input
              style={{ width: "100%" }}
              {...register("email", {
                required: "Email can't be blank",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email pattern",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.email?.message}</p>
          </div>
          <div>
            <label>First Name: </label>
            <input
              style={{ width: "100%" }}
              {...register("firstName", {
                required: "First name can't be blank",
                minLength: {
                  value: 3,
                  message: "First name must be length 3 to 30 character",
                },
                maxLength: {
                  value: 30,
                  message: "First name must be length 3 to 30 character",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.firstName?.message}</p>
          </div>
          <div>
            <label>Last Name: </label>
            <input
              style={{ width: "100%" }}
              {...register("lastName", {
                required: "Last name can't be blank",
                minLength: {
                  value: 3,
                  message: "Last name must be length 3 to 30 character",
                },
                maxLength: {
                  value: 30,
                  message: "Last name must be length 3 to 30 character",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.lastName?.message}</p>
          </div>
          <div>
            <label>Password: </label>
            <input
              style={{ width: "100%" }}
              {...register("password", {
                required: "Password can't be blank!",
                minLength: {
                  value: 8,
                  message: "Password must be length 8 to 16 character",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be length 8 to 16 character",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          </div>
          <div>
            <label>Re-type Password: </label>
            <input
              style={{ width: "100%" }}
              {...register("passwordConfirmation", {
                required: "Confirm password can't be blank !",
                validate: (value) =>
                  value === getValues("password") || "Password not match",
              })}
            />
            <p style={{ color: "red" }}>
              {errors.passwordConfirmation?.message}
            </p>
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
          {/* TODO: add  CRSF token*/}
        </form>
        <Link to={loginFormUrl}>
          You already have an account ? Sign in here
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
