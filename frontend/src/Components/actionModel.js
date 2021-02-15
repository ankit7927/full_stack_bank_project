import Model from "react-model"
import React from "react"

class ActionModel extends React.Component {
  state = {
    isActice: false,
  }
  componentDidMount() {
    this.setState({
      isActice: true
    })
  }


  render() {
    return (<div>
      <Model isOpen="true">
        <h1>enter amount</h1>
    <form accept-charset="utf-8">
      <input type="number" name="amount" value="0" /><br />
      <input type="submit" name="" id="" value="submit" />
    </form>
    </Model>
    </div>

    )
  }
}


export default ActionModel;