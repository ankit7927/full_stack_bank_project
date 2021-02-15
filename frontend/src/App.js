import React from "react"
import {
  Switch,
  Route
} from "react-router-dom"

import CookieConsent from "react-cookie-consent";

import Navbar from "./Components/Navbar"
import Homepage from "./Pages/Homepage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import NotFound from "./Pages/NotFound"
import Deposit from "./Components/Deposit"
import Withdraw from "./Components/Withdraw"




class App extends React.Component {



  render() {
    return (
      <div>
          <Switch>
          <Route path="/:username" component={Homepage} />
          <Route component={Login} />
          <Route path="/reg" component={Register} />
      <Route path="/deposit" component={Deposit} />
      <Route path="/withdraw" component={Withdraw} />
          </Switch>
      </div>
    );
  }}

export default App;