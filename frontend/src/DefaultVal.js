const axiosConfig = {
  //withCredentials: true,
  headers: {
    token: localStorage.getItem('token')
  }

}


export {
  axiosConfig
}