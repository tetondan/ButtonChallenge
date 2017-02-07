import React, {Component} from "react"

export default class RadioButton extends Component {
  constructor(props){
    super(props)
    /*props = 
    name: string
    value: any
    checked: boolean
    label: string|element|component
    onChange: funciton
    */

  }

  render(){
    return (
      <div>
        <input type="radio"
        name={this.props.name}
        value={this.props.value}
        checked={this.props.checked}
        onChange={this.props.onChange} />
        {this.props.label}
      </div>
    )
  }
}