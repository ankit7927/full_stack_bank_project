import React from "react"
import axios from "axios"
import Cookies from 'js-cookie';
import {
  axiosConfig
} from "../DefaultVal"
import Model from "react-model"
import ActionModel from "../Components/actionModel"

import {
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom"



class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      username: this.props.match.params.username,
      balance: null

    }

  }


  componentDidMount() {

    this.url = `http://localhost:4000/auth/${this.state.username}`;

    axios.get(this.url, axiosConfig)
    .then(res => {
      this.setState({
        name: res.data.name,
        balance: res.data.balance
      })
      alert("fetched successfully")
    })
    .catch(err => alert(err))

  }





  deposit() {
    const rawamount = prompt("enter amount to deposit")
    const amount = parseInt(rawamount)
    axios.post("http://localhost:4000/auth/depo", {
      "amount": amount
    }, axiosConfig)
    .then((res)=> {
      alert(res.data)
    })
    .catch(err => alert (err))
  }


  withd() {
    const rawamount = prompt("enter amount to withdraw")
    const amount = parseInt(rawamount)
    axios.post("http://localhost:4000/auth/withd", {
      "amount": amount
    }, axiosConfig)
    .then((res)=> {
      alert(res.data)
    })
    .catch(err => alert (err))


  }

  redirectToHome = () => {
    const path = "/"
    const {
      history
    } = this.props;
    if (history) history.push(path);
  }





  render() {
    return (
      <div className="App">
          <div>
    welcome user {this.state.name}
      </div>
  <div>
   balance : <h1>{this.state.balance}</h1>
      </div>
  <div>
    <button onClick={this.deposit}>Deposit</button>
          <button onClick={this.withd}>Withdraw</button>
      </div>
          <br />
          <div>
    <button>update</button><br />
    <button>logout</button><br />
      </div>
      <ul>
  <li><Link to="deposit">Deposit</Link></li>
  <li><Link to="withdraw">Withdraw</Link></li>
      </ul>
      </div>


    );
  }}

export default Homepage;