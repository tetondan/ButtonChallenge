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
		this.checkBoxClickHandler = this.checkBoxClickHandler.bind(this);
	}
	checkBoxClickHandler(){
		this.setState((prev) => {
			return {checked: !prev.checked}})
	}
	render(){
		return (
			<div>
				<input type="checkbox"
				name={this.props.name}
				value={this.props.value}
				checked={this.state.checked}
				onChange={this.checkBoxClickHandler} />
				{this.props.label}
			</div>
		)
	}
}