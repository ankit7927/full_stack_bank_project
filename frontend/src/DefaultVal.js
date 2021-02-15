const axiosConfig = {
  withCredentials: true,
  header: {
    "Cookie": localStorage.getItem('token')
  }

}


export {
  axiosConfig
}