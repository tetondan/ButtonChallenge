import React, {Component} from "react"

export default class CheckButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      checked: props.checked
    }
    /*props = 
    name: string
    value: any
    checked: boolean
    label: string|element|component
    onChange: function
    */
  }

  render(){
    return (
      <div>
        <input type="checkbox"
        name={this.props.name}
        value={this.props.value}
        checked={this.props.checked}
        onChange={this.props.onChange} />
        {this.props.label}
      </div>
    )
  }
}