const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  // We need to check whether token is expired or not (We'll do it later)
  if (user && user.token) {
    return { Auhorization: 'Bearer ' + user.token}
  }else {
    return {}
  }
}

export default authHeader