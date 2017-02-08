import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from './components/buttonGroup'

export default class App extends Component {

  constructor( props ){
    super( props )
    this.state = {
      values1: [],
      values2: []
    }
    // this.radioButtonsOnChange = this.radioButtonsOnChange.bind(this);
    this.checkBoxesOnChange = this.checkBoxesOnChange.bind(this)
    this.radioButtonsOnChange = this.radioButtonsOnChange.bind(this)
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
                    name="radiobutton"
                    onChange={ this.radioButtonsOnChange }
                    value={ [] }
                    label={ <h1>Button Group 2: Radio Buttons</h1> }
                    multiple={ false }
                  />
  }

  checkBoxesOnChange( buttonGroup ){
    this.setState( { values1: buttonGroup.state.value } )
  }

  radioButtonsOnChange( buttonGroup ){
    this.setState( { values2: buttonGroup.state.value } )
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
        <h4>Selected Values:</h4>
        { this.state.values2.map( ( item, index ) => {
            return <p key={index}>{item}</p>
          }
        )}
      </div>
    )
  }
}