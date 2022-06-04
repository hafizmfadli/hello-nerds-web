import axios from "axios"
import { LOCAL_STORAGE_AUTH_KEY } from '../AppConst'

const API_URL = process.env.REACT_APP_HELLO_NERDS_API_BASE_URL + "/v1"
class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(API_URL + "/tokens/authentication", { email, password })
      // we store token in web local storage for a while.
      // We will move to cookies later
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(response.data))
      return response.data
    } catch (err) {
      throw err
    }
  }
  async logout() {
    // Remove token from browser's local storage
    // is not sufficient, we also need to remove user token
    // from backend. (We'll do it later)
    const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)).authentication_token.token
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)).user_info

    try {
      await axios.delete(`${API_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          user_id: user.id
        }
      })
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
      window.location.reload();
    } catch (err) {
      console.error(err)
      throw err
    }

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
  isLoggedIn() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY))
  }
}

export default new AuthService();