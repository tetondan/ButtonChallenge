/* This is a demonstration of the ButtonGroup Component 
   it renders both CheckButtons and RadioButton groups
   The CheckButton group uses the onChange prop 
   and the RadioButton group uses the accessor prop in order to access data
   I've chosen to display the selected values below the groups, 
   but that is built specifically for this demonstration.
   Each group renders three seperate buttons with unique values.
*/


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from './components/buttonGroup'

export default class App extends Component {

  constructor( props ){
    super( props )
    this.state = {
      values1: [],
      values2: ['none selected']
    }
    this.checkBoxesOnChange = this.checkBoxesOnChange.bind( this );
    this.accessorButtonClick = this.accessorButtonClick.bind( this );

    this.propsAccValueFunction = ( object ) => {
      this.propsAccValue = object
    }
    this.propsAccValue = () => { return };

    this.button1 = <ButtonGroup
                    options={ [
                      { value: "1 CB", checked: false, label: "Here is the First checkbox" },
                      { value: "2 CB", checked: false, label: "Here is the Second checkbox" },
                      { value: "3 CB", checked: false, label: "Here is the Third checkbox"}
                    ] }
                    name="checkbox"
                    onChange={ this.checkBoxesOnChange }
                    value={ [] }
                    label={ <h1>Button Group 1: Checkboxes</h1> }
                    multiple={ true }
                    implyAll={ true }
                    implyNone={ true }
                  />
    this.button2 = <ButtonGroup
                    options={ [
                      { value: "1 RB", checked: false, label: "Here is the First radio button" },
                      { value: "2 RB", checked: false, label: "Here is the Second radio button" },
                      { value: "3 RB", checked: false, label: "Here is Third radio button" }
                    ] }
                    accessor={{value: this.propsAccValueFunction}}
                    name="radiobutton"
                    value={ [] }
                    label={ <h1>Button Group 2: Radio Buttons</h1> }
                    multiple={ false }
                  />
  }

  checkBoxesOnChange( buttonGroup ){
    this.setState( { values1: buttonGroup.state.value } )
  }

  accessorButtonClick(){
    this.setState( { values2: this.propsAccValue() } );
  }

  render(){
    return (
      <div>
        { this.button1 }
        <h4>Selected Values:</h4>
        { this.state.values1.map( ( item, index ) => {
            return <p key={index}>{item}</p>
          } 
        )}
        { this.button2 }
        <h4>Selected Values using accessor prop: <button onClick={this.accessorButtonClick}> Output Current Value </button></h4>
        { this.state.values2.map( ( item, index ) => {
            return <p key={index}>{item}</p>
          }
        )}
      </div>

    )
  }
}