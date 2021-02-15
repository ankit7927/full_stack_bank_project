import React from "react"
import {
  Link
} from "react-router-dom"

const Navbar = ()=> {

  const [user,
    setUser] = React.useEffect("")

  React.useEffect(()=> {
    setUser(this.props.match.params.username)
  })

  if (user == "") {
    return (<div>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="reg">Register</Link></li>
    <li><Link to="login">Login</Link></li>
    </ul>
    </div>
    )
  } else {
    return (<div>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="logout">Logout</Link></li>
    </ul>
    </div>
    )


  }



}

export default Navbar;