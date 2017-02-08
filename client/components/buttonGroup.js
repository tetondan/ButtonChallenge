import React, { Component } from 'react';
import RadioButton from './radioButton';
import CheckButton from './checkButton';

export default class ButtonGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: props.value || [],
      noneChecked: true,
      allChecked: false,
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.allClickHandler = this.allClickHandler.bind(this)
    this.noneClickHandler = this.noneClickHandler.bind(this)
  }

  componentDidUpdate(){
    console.log(this.state)
    this.props.onChange(this)
  }

  //create click handler to pass down to each button to control state
  clickHandler(e){
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
          let newValues = [ ...prev.value, value]
          return { 
            value: newValues,
            noneChecked: false,
            allChecked: (prev.value.length + 1 === this.props.options.length) 
          }
        })
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
    } else {
      this.props.options.forEach( ( item ) => {
        if(item.value === value){
          item.checked = true;
          this.setState( () => {
             return {value: [item.value]}
          })
        } else {
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

        //if implyAll create implyAll button
        allButton = <CheckButton onChange={this.allClickHandler} name="implyAll" checked={this.state.allChecked} label="Select All"/>
      }
      if(this.props.implyNone){

        //if implyNone create implyNone button
        noneButton = <CheckButton onChange={this.noneClickHandler} name="implyNone" checked={this.state.noneChecked} label="Select None"/>
      }
    }
    //create list of buttons from this.props.options
    buttons = this.props.options.map( ( item, key ) => {
          if(this.props.multiple){
            return (
                <CheckButton
                  name={item.name}
                  value={item.value}
                  checked={item.checked}
                  onChange={this.clickHandler}
                  onClick={() => {console.log("heerree")}}
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

