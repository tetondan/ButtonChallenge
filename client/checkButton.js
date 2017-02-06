import React, {Component} from "react"

export default class CheckButton extends Component {
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
				<input type="checkbox"
				value={this.props.value}
				checked={this.props.checked}
				onChange={this.props.onChange} />
				{this.props.label}
			</div>
		)
	}
}