import React from "react"


class Register extends React.Component {




  render() {
    return (
      <div>
        <form accept-charset="utf-8">
  name: <input type="text" value="" /><br />
  address: <input type="text" value="" /><br />
  email: <input type="email" value="" /><br />
  username: <input type="text" value="" /><br />
  password: <input type="text" value="" /><br />
  <input type="submit" value="submit" />
  <input type="reset" value="reset" />
      </form>
      </div>
    );
  }}

export default Register;