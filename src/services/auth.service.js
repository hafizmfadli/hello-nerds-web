import axios from "axios"
import { LOCAL_STORAGE_AUTH_KEY } from '../AppConst'

const API_URL = process.env.REACT_APP_HELLO_NERDS_API_BASE_URL + "/v1"
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/tokens/authentication", {email, password})
      .then((response) => {
        if(response.data.authentication_token){
          // we store token in web local storage for a while.
          // We will move to cookies later
          localStorage.setItem("hello_nerds_user", JSON.stringify(response.data))
        }
        console.log(response.data)
        return response.data
      })
  }
  logout() {
    // Remove token from browser's local storage
    // is not sufficient, we also need to remove user token
    // from backend. (We'll do it later)
    localStorage.removeItem("user")
  }
  register(email, firstName, lastName, password, confirmPassword) {
    return axios.post(API_URL + "/users", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password,
      confirm_password: confirmPassword
    })
  }
  isLoggedIn(){
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY))
  }
}

export default new AuthService();