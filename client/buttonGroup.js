import React, { Component } from 'react';
import RadioButton from './radioButton';
import CheckButton from './checkButton';

export default class ButtonGroup extends Component {
  constructor(props){
    super(props)
    let values = props.value || []
    if(props.implyAll){
    	props.options.forEach((item)=>{
    		item.checked = true;
    		values.push(item.value)
    	})
    }
    console.log(props.implyNone)
    this.state = {
    	value: values,
    	implyNone: props.implyNone || true,
    	implyAll: props.implyAll || false
    }
    /*props = 
    Uses CheckButton & RadioButton to render based on props.
    Should accept the following props:

    X name: string

    X options: arrayOf(object)
    Rendered as buttons (same keys as the props above).

    X value: (optional)
    Represents currently selected value(s) when used as a controlled input. This could be left out in favor of using 'checked' prop on options, it's up to you.

    X multiple: bool
    Indicates weather to use radio or check.

    X implyAll: bool
    Renders an 'all' button that is checked if no value or checked options.

    implyNone: bool
    Renders a 'none' button that is checked if no value or checked options.

    X label: (string | element | component)

    X onChange
    The 'onChange' argument, if not using the synthetic event directly, should closely model it's structure.
    */
    this.checkBoxClickHandler = this.checkBoxClickHandler.bind(this)
    this.implyAll = this.implyAll.bind(this)
    this.implyNone = this.implyNone.bind(this)

  }
  checkBoxClickHandler(e){
  	let value = e.target.value
  	if(this.props.multiple){
	  	this.props.options.forEach( ( item ) => {
	  		if( item.value === value ){
	  			item.checked = !item.checked
	  		}
	  	})
	  	let index = this.state.value.indexOf( value )
	  	if(index < 0){
	  		this.setState( ( prev ) => {
	  			return { 
	  				value: [ ...prev.value, value],
	  				implyNone: false,
	  				implyAll: (prev.value.length + 1 === this.props.options.length) 
	  			}
	  		})
	  	} else {
	  		this.setState( ( prev ) => { 
	  			return { 
	  				value: [ ...prev.value.slice(0,index), ...prev.value.slice(index + 1)],
					  implyNone: (prev.value.length - 1 === 0),
	  				implyAll: false
	  			} 
	  		})
	    }
	  } else {
      this.props.options.forEach( ( item ) => {
        if(item.value === value){
          item.checked = true;
          this.setState({value: [item.value]})
        } else {
          item.checked = false;
        }
      })
    }
  	this.props.onChange();
  }

  implyAll(){
  	let newValues = []
    let currentImplyAll = this.state.implyAll;
  	this.props.options.forEach( ( item ) => {
      if(!currentImplyAll){
    		item.checked = true
    		newValues.push(item.value)
      } else {
        item.checked = false
      }
  	})

  	this.setState( (prev) => {
      return {
        value: newValues,
        implyAll: !prev.implyAll,
        implyNone: !prev.implyNone
      }
    })
  }

  implyNone(){
  	this.setState( ( prev ) => {
      console.log(prev)
      let newValues = []
      if(!prev.implyNone){
        this.props.options.forEach( ( item ) => {
          item.checked = true
          newValues.push
        })
      } else {
        this.props.options.forEach( ( item ) => {
          item.checked = false
        })
      }
      console.log(this.props)
      return {
        value: newValues,
        implyNone: !prev.implyNone,
        implyAll: !prev.implyAll
      }
    })
  }

  render(){
    return (
      <div>
      	{this.props.label}
        {this.props.options.map( ( item, key ) => {
        	if(this.props.multiple){
	        	return (
	        		<CheckButton
	        			name={item.name}
	        			value={item.value}
	        			checked={item.checked}
	        			onChange={this.checkBoxClickHandler}
	        			label={item.label}
	        			key={key}
	        		/>
	        	)
	        } else {
	        	return (
	        		<RadioButton
	        			name={item.name}
	        			value={item.value}
	        			checked={item.checked}
	        			onChange={this.checkBoxClickHandler}
	        			label={item.label}
	        			key={key}
	        		/>
	        	)
	        }
        })}
        {/* add conditional statements determining if these should be used */}

        <input type="checkbox" onChange={this.implyAll} name="implyAll" checked={this.state.implyAll}/><label>Select All</label> 
        <input type="checkbox" onChange={this.implyNone} name="implyNone" checked={this.state.implyNone}/><label>Select None</label> 
      </div>
    )
  }
}
