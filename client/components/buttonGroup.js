import React, { Component } from 'react';
import RadioButton from './radioButton';
import CheckButton from './checkButton';

export default class ButtonGroup extends Component {
  constructor( props ){
    super( props )
    //add 'this' binding to all new methods on the class
    this.clickHandler = this.clickHandler.bind( this )
    this.allClickHandler = this.allClickHandler.bind( this )
    this.noneClickHandler = this.noneClickHandler.bind( this )

    this.state = {
      //add values and options array to state because props are read only
      value: props.value || [],
      noneChecked: true,
      allChecked: false,
      options: props.options || []
    }
    //if accessor prop exists assign it to return a curried function that returns the given state for use in a higher level component 
    if(props.accessor !== undefined){
      if(props.accessor.value !== undefined && typeof props.accessor.value === "function"){  
        props.accessor.value(() => {
          return this.state.value
        })
      }
      if(props.accessor.options !== undefined && typeof props.accessor.options === "function"){  
        props.accessor.options( () => {
          return this.state.options
        })
      }
    }
  }

  getInitialProps(){
    console.log("theing")
  }
  //if onChange prop exists and is a function, fire it everytime the page updates
  componentDidUpdate(){
    if(typeof this.props.onChange === "function") this.props.onChange(this)
  }

  //create click handler to pass down to each button to control state
  clickHandler( e ){
    //using the synthetic onChange event passes the event property which we can use to access the target element
    let value = e.target.value
    //in order to keep track of the which values have been selected find the index of the target value in the current value array
    let index = this.state.value.indexOf( value )
    //create a copy of the options array so that we can modify it without modifying the original state
    let options = this.state.options.slice(0)
    //check to see if this button group is checkboxes
    if( this.props.multiple ){
      //iterate through options array and either check or uncheck the item containing the current target value
      options.forEach( ( item ) => {
        if( item.value === value ){
          item.checked = !item.checked
        }
      })
      //if option currently not in values array, add option to values array and check that option
      if( index < 0 ){
        this.setState( ( prev ) => {
          let newValues = [ ...prev.value, value]
          //return new state including the new value and updated options array
          return { 
            value: newValues,
            noneChecked: false,
            allChecked: (prev.value.length + 1 === this.props.options.length),
            options 
          }
        })
      // else, remove option from values array and set that option to unchecked
      } else {
        this.setState( ( prev ) => { 
          let newValues = [ ...prev.value.slice(0,index), ...prev.value.slice(index + 1)];
          //return new state removing the target value and updating the options array
          return { 
            value: newValues,
            noneChecked: (prev.value.length - 1 === 0),
            allChecked: false,
            options
          } 
        })
      }
    //else the button group is radio buttons
    } else {
      //Becuase they are radio buttons, there can only be one selected. Select the one item and unselect all others
      options.forEach( ( item ) => {
        if( item.value === value ){
          item.checked = true;
        } else {
          //set all other option to unchecked
          item.checked = false;
        }
      })
      //set state with new value selected and updated otions array
      this.setState({ 
          value: [ value ],
          options
      })
    }
  }
  //add click handler for select all button
  allClickHandler(){
    //create a new array to hold values
    let newValues = []
    //create a copy of the options array on the state in order to transform the items
    let options = this.state.options.slice(0);
    //iterate through the options array either selecting or unselecting all, according to the current state of the select all button
    options.forEach( ( item ) => {
      if( !this.state.allChecked ){
        item.checked = true
        newValues.push( item.value )
      } else {
        item.checked = false
      }
    })
    //update the state transforming the select all and select none checked props, update the checked props on the options array, and add or remove all the vlaues 
    this.setState( (prev) => {
      return {
        value: newValues,
        allChecked: !prev.allChecked,
        noneChecked: prev.allChecked,
        options
      }
    })
  }
  //add click handler for select none button
  noneClickHandler(){
    //create a new array to hold values
    let newValues = []
    //create a copy of the options array on the state in order to transform the items
    let options = this.state.options.slice(0);
    if(this.state.noneChecked){
      options.forEach( ( item ) => {
        item.checked = true
        newValues.push(item.value)
      })
    } else {
      options.forEach( ( item ) => {
        item.checked = false
      })
    }
    //update the state transforming the select all and select none checked props, update the checked props on the options array, and add or remove all the vlaues 
    this.setState( ( prev ) => {
      return {
        value: newValues,
        noneChecked: !prev.noneChecked,
        allChecked: prev.noneChecked,
        options
      }
    })
  }

  render(){
    let allButton, noneButton, buttons;
    if(this.props.multiple){
      if(this.props.implyAll && (this.props.multiple || this.props.multiple === undefined)){
        //if implyAll and buttons not radio buttons, create Select All button
        allButton = <CheckButton onChange={this.allClickHandler} name="selectAll" checked={this.state.allChecked} label="Select All"/>
      }
      if(this.props.implyNone && (this.props.multiple || this.props.multiple === undefined)){
        //if implyNone and buttons not radio buttons, create Select None button
        noneButton = <CheckButton onChange={this.noneClickHandler} name="selectNone" checked={this.state.noneChecked} label="Select None"/>
      }
    }

    //create list of buttons from this.state.options
    //check to see if button group is checkboxes
    if( this.props.multiple ){
      buttons = this.state.options.map( ( item, key ) => {
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
      }) 
    } else {
      buttons = this.state.options.map( ( item, key ) => {
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
      })
    }
    
    //render label and all buttons
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

ButtonGroup.propTypes = {
    name: React.PropTypes.string,
    options: React.PropTypes.array.isRequired,
    value: React.PropTypes.array,
    multiple: React.PropTypes.bool.isRequired,
    implyAll: React.PropTypes.bool,
    implyNone: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    label: React.PropTypes.node,
    accessor: React.PropTypes.object
}

