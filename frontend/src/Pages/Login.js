import React from "react"
import axios from "axios"
import Cookies from 'js-cookie'



class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }
  subHand = this.subHand.bind(this)
  clickHand = this.clickHand.bind(this)

  redirectToHome = (name) => {
    const path = `/${name}`
    const {
      history
    } = this.props;
    if (history) history.push(path);
  }

  subHand(e) {
    e.preventDefault()

    axios.post("http://localhost:4000/auth/login/", this.state)
    .then((res)=> {

      if (res.status == 200) {
        localStorage.setItem('token', res.headers['jwt-token'])
        alert (res.data)
        this.redirectToHome(res.data)
      }

    })
    .catch (err => alert(err))



  }

  clickHand(e) {
    this.setState({

      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form>
  username: <input type="text" value="" value={this.state.username} onChange={this.clickHand} name="username" /><br />
  password: <input type="text" value="" value={this.state.password} onChange={this.clickHand} name="password" /><br />
  <input type="submit" onClick={this.subHand} value="submit" />
  <input type="reset" value="reset" />
      </form>
      </div>
    );
  }}

export default Login;