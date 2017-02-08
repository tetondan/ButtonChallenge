import React, { Component } from 'react';
import RadioButton from './radioButton';
import CheckButton from './checkButton';

export default class ButtonGroup extends Component {
  constructor( props ){
    super( props )

    this.clickHandler = this.clickHandler.bind( this )
    this.allClickHandler = this.allClickHandler.bind( this )
    this.noneClickHandler = this.noneClickHandler.bind( this )

    this.state = {
      //add values array to state becuase props are read only
      value: props.value || [],
      noneChecked: true,
      allChecked: false
    }
    if(props.accessor !== undefined){
      if(props.accessor.value !== undefined && typeof props.accessor.value === "function"){  
        props.accessor.value(() => {
          return () => {
            return this.state.value
          }
        })
      }
      if(props.accessor.options !== undefined && typeof props.accessor.options === "function"){  
        props.accessor.options(() => {
          return () => {
            return this.props.options
          }
        })
      }
    }
  }

  componentDidUpdate(){
    this.props.onChange(this)
  }

  //create click handler to pass down to each button to control state
  clickHandler( e ){

    let value = e.target.value
    let index = this.state.value.indexOf( value )

    //check to see if this button group is checkboxes
    if( this.props.multiple ){
      this.props.options.forEach( ( item ) => {
        if( item.value === value ){
          item.checked = !item.checked
        }
      })
      //if option currently not in values array, add option to values array and check that option
      if( index < 0 ){
        this.setState( ( prev ) => {
          let newValues = [ ...prev.value, value]
          return { 
            value: newValues,
            noneChecked: false,
            allChecked: (prev.value.length + 1 === this.props.options.length) 
          }
        })
      // else, remove option from values array and set that option to unchecked
      } else {
        this.setState( ( prev ) => { 
          let newValues = [ ...prev.value.slice(0,index), ...prev.value.slice(index + 1)];
          return { 
            value: newValues,
            noneChecked: (prev.value.length - 1 === 0),
            allChecked: false
          } 
        })
      }
    //else the button group is radio buttons
    } else {
      //Becuase they are radio buttons, there can only be one selected.
      this.props.options.forEach( ( item ) => {
        if( item.value === value ){
          item.checked = true;
          this.setState( () => {
             return { value: [ item.value ] }
          })
        } else {
          //set all other option to unchecked
          item.checked = false;
        }
      })
    }
  }

  allClickHandler(){
    let newValues = []
    let currentAllChecked = !this.state.allChecked;
    this.props.options.forEach( ( item ) => {
      if(currentAllChecked){
        item.checked = true
        newValues.push(item.value)
      } else {
        item.checked = false
      }
    })

    this.setState( (prev) => {
      return {
        value: newValues,
        allChecked: !prev.allChecked,
        noneChecked: prev.allChecked
      }
    })
  }

  noneClickHandler(){
    this.setState( ( prev ) => {
      let newValues = []
      if(prev.noneChecked){
        this.props.options.forEach( ( item ) => {
          item.checked = true
          newValues.push(item.value)
        })
      } else {
        this.props.options.forEach( ( item ) => {
          item.checked = false
        })
      }
      return {
        value: newValues,
        noneChecked: !prev.noneChecked,
        allChecked: prev.noneChecked
      }
    })
  }

  render(){
    let allButton, noneButton, buttons;
    if(this.props.multiple){
      if(this.props.implyAll){

        //if implyAll create Select All button
        allButton = <CheckButton onChange={this.allClickHandler} name="selectAll" checked={this.state.allChecked} label="Select All"/>
      }
      if(this.props.implyNone){

        //if implyNone create Select None button
        noneButton = <CheckButton onChange={this.noneClickHandler} name="selectNone" checked={this.state.noneChecked} label="Select None"/>
      }
    }
    //create list of buttons from this.props.options
    buttons = this.props.options.map( ( item, key ) => {
          //check to see if button group is checkboxes
          if( this.props.multiple ){
            return (
              <CheckButton
                name={this.props.name}
                value={item.value}
                checked={item.checked}
                onChange={this.clickHandler}
                label={item.label}
                key={key}
              />
            )
          } else {
            return (
              <RadioButton
                name={this.props.name}
                value={item.value}
                checked={item.checked}
                onChange={this.clickHandler}
                label={item.label}
                key={key}
              />
            )
          }
        })
    return (
      <div>
        {this.props.label}
        {buttons}
        {allButton}
        {noneButton}
      </div>
    )
  }
}

