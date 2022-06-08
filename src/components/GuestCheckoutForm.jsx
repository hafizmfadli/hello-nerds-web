import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import styleCss from "./MemberOrGuest.module.css";
import axios from "axios";
import AuthService from "../services/auth.service";
import CartService from "../services/cart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartSetup } from "../slices/cartSlice";


const API_URL = process.env.REACT_APP_HELLO_NERDS_API_BASE_URL + "/v1";

const GuestCheckoutForm = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCitites] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    let fetchData = async () => {
      let response;
      try {
        response = await axios.get(API_URL + "/provinces");
        setProvinces(response.data.provinces);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    // make HTTP request to order and shipping address API endpoint
    if (AuthService.isLoggedIn()) {
      // fetch cart data from server
      // ngke deui
    } else {
      // guest user
      // get cart data from local storage
      console.log("FROM LOCAL STORAGE : ", CartService.items);

      const shippingAddress = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        addresses: data.address,
        postal_code: data.postal_code.toString(),
        province_id: parseInt(data.province),
        city_id: parseInt(data.city_kab),
        district_id: parseInt(data.district),
        subdistrict_id: parseInt(data.subdistrict),
        phone: data.phone,
      };

      try {
        await CartService.guestCheckout(shippingAddress);
        CartService.remove()
        dispatch(cartSetup([]))

        let timerInterval;
        MySwal.fire({
          icon: "success",
          title: "Checkout Success",
          html: 'Yoi will be redirected in <b></b> ',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            MySwal.showLoading();
            const b = MySwal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = MySwal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        });
        navigate('/')

      } catch (err) {
        console.error(err);
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    }
  };

  const handleProvinceSelected = async (e) => {
    if (e.target.value > 0) {
      // Send HTTP request to get corresponding cities
      try {
        const response = await axios.get(`${API_URL}/cities`, {
          params: {
            prov_id: e.target.value,
          },
        });
        setCitites(response.data.cities);
        setDistricts([]);
        setSubDistricts([]);
      } catch (err) {
        console.error(err);
      }
    } else {
      setCitites([]);
    }
  };

  const handleCitySelected = async (e) => {
    if (e.target.value > 0) {
      // Send HTTP request to get corresponding districts
      try {
        const response = await axios.get(`${API_URL}/districts`, {
          params: {
            city_id: e.target.value,
          },
        });
        setDistricts(response.data.districts);
        setSubDistricts([]);
      } catch (err) {
        console.error(err);
      }
    } else {
      setCitites([]);
    }
  };

  const handleDistrictSelected = async (e) => {
    if (e.target.value > 0) {
      // Send HTTP request to get corresponding subdistrict
      try {
        const response = await axios.get(`${API_URL}/subdistricts`, {
          params: {
            district_id: e.target.value,
          },
        });
        setSubDistricts(response.data.subdistricts);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSubDistricts([]);
    }
  };

  const handleSubdistrictSelected = async (e) => {
    const { province, city_kab, district } = getValues();
    try {
      const response = await axios.get(`${API_URL}/postalcode`, {
        params: {
          prov_id: province,
          city_id: city_kab,
          district_id: district,
          subdistrict_id: e.target.value,
        },
      });
      setValue("postal_code", response.data.postal_code.postal_code);
    } catch (err) {
      console.error(err);
    }
  };

  let provinceOptions = (
    <React.Fragment>
      <option value="0"> --- Please Select --- </option>
      {provinces &&
        provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
    </React.Fragment>
  );

  let cityOptions =
    cities.length > 0 ? (
      <React.Fragment>
        <option value="0"> --- Please Select --- </option>
        {cities &&
          cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
      </React.Fragment>
    ) : (
      <option value="0"> --- Please Select --- </option>
    );

  let districtOptions =
    districts.length > 0 ? (
      <React.Fragment>
        <option value="0"> --- Please Select --- </option>
        {districts &&
          districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
      </React.Fragment>
    ) : (
      <option value="0"> --- Please Select --- </option>
    );

  let subDistrictOptions =
    subDistricts.length > 0 ? (
      <React.Fragment>
        <option value="0"> --- Please Select --- </option>
        {subDistricts &&
          subDistricts.map((subDistrict) => (
            <option key={subDistrict.id} value={subDistrict.id}>
              {subDistrict.name}
            </option>
          ))}
      </React.Fragment>
    ) : (
      <option value="0"> --- Please Select --- </option>
    );

  return (
    <Box
      sx={{
        margin: "100px auto",
        border: "1px solid black",
        width: { xs: "80%", sm: "70%", md: "60%", lg: "40%" },
        padding: "50px",
        backgroundColor: "#f8f8f8",
        textAlign: "center",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4">Enter Your Shipping Address</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            Be sure to click "Ship to this address" when done
          </Typography>
        </Grid>
        <hr></hr>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <div>
              <label htmlFor="email">E-Mail</label>
            </div>
            <input
              id="email"
              type="text"
              name="email"
              {...register("email", {
                required: "Email can't be blank",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email pattern",
                },
              })}
              className={styleCss.input}
            />
            <p style={{ color: "red" }}>{errors.email?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="first_name">First Name</label>
            </div>
            <input
              id="first_name"
              type="text"
              name="first_name"
              {...register("first_name", {
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
              className={styleCss.input}
            />
            <p style={{ color: "red" }}>{errors.first_name?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="last_name">Last Name</label>
            </div>
            <input
              id="last_name"
              type="text"
              name="last_name"
              {...register("last_name", {
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
              className={styleCss.input}
            />
            <p style={{ color: "red" }}>{errors.last_name?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="address">Address</label>
            </div>
            <input
              id="address"
              type="text"
              name="address"
              {...register("address", {
                required: "Address can't be blank",
              })}
              className={styleCss.input}
            />
            <p style={{ color: "red" }}>{errors.address?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="postal_code">Postal Code:</label>
            </div>
            <input
              id="postal_code"
              type="text"
              name="postal_code"
              className={styleCss.input}
              {...register("postal_code", {
                required: "postal_code can't be blank",
              })}
            />
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="province">Province</label>
            </div>
            <select
              id="province"
              name="province"
              {...register("province", {
                validate: {
                  positive: (v) =>
                    parseInt(v) > 0 || "Province must be selected",
                },
              })}
              onChange={handleProvinceSelected}
              className={styleCss.input}
            >
              {provinceOptions}
            </select>
            <p style={{ color: "red" }}>{errors.province?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="city_kab">City/Kabupaten</label>
            </div>
            <select
              id="city_kab"
              name="city_kab"
              {...register("city_kab", {
                validate: {
                  positive: (v) =>
                    parseInt(v) > 0 || "City/Kabupaten must be selected",
                },
              })}
              onChange={handleCitySelected}
              className={styleCss.input}
            >
              {cityOptions}
            </select>
            <p style={{ color: "red" }}>{errors.city_kab?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="district">District/Kecamatan</label>
            </div>
            <select
              id="district"
              name="district"
              {...register("district", {
                validate: {
                  positive: (v) =>
                    parseInt(v) > 0 || "District/Kecamatan must be selected",
                },
              })}
              onChange={handleDistrictSelected}
              className={styleCss.input}
            >
              {districtOptions}
            </select>
            <p style={{ color: "red" }}>{errors.district?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="subdistrict">Village/Kelurahan</label>
            </div>
            <select
              id="subdistrict"
              name="subdistrict"
              {...register("subdistrict", {
                validate: {
                  positive: (v) =>
                    parseInt(v) > 0 || "Village/Kelurahan must be selected",
                },
              })}
              className={styleCss.input}
              onChange={handleSubdistrictSelected}
            >
              {subDistrictOptions}
            </select>
            <p style={{ color: "red" }}>{errors.subdistrict?.message}</p>
          </Grid>

          <Grid item>
            <div>
              <label htmlFor="phone">Phone</label>
            </div>
            <input
              id="phone"
              type="text"
              name="phone"
              {...register("phone", {
                required: "phone number can't be blank",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please input numeric characters only",
                },
                minLength: {
                  value: 11,
                  message: "Mobile phone number must be length 11 to 13 digit",
                },
                maxLength: {
                  value: 13,
                  message: "Mobile phone number must be length 11 to 13 digit",
                },
              })}
              className={styleCss.input}
            />
            <Typography variant="caption" component="div">
              (Example: +62 21 468XXXX or +62 8XX 876XXXX)
            </Typography>
            <p style={{ color: "red" }}>{errors.phone?.message}</p>
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained" sx={{ width: "100%" }}>
              Ship to this address
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};

export default GuestCheckoutForm;
