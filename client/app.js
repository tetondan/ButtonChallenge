import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from './components/buttonGroup'

export default class App extends Component {

constructor(props){
  super(props)
  this.state = {
    values1: [],
    values2: []
  }
  this.radioButtonsOnChange = this.radioButtonsOnChange.bind(this);
  this.checkBoxesOnChange = this.checkBoxesOnChange.bind(this)
}

checkBoxesOnChange(buttonGroup){
  console.log(buttonGroup)
  this.setState({values1: buttonGroup}, () => {console.log('rerendering')})
}

radioButtonsOnChange(buttonGroup){
  this.setState({values2: buttonGroup.state.value})
}

render(){
  return (
    <div>
      <ButtonGroup
        options={[
          {
            name: "checkbox",
            value:"1",
              checked: false,
              label: "Here is the First checkbox"
          },
          {
            name: "checkbox",
            value:"2",
              checked: false,
              label: "Here is the Second checkbox"
          },
          {
            name: "checkbox",
            value:"3",
            checked: false,
            label: "Here is the THIRD checkbox"
          }
        ]}
        onChange={this.checkBoxesOnChange}
        value={[]}
        label={<h2>Button Group 1: Checkboxes</h2>}
        multiple={true}
        implyAll={false}
      />
      <h4>Selected Values:</h4>
      {this.state.values1.map((item, index) => {
        return <p key={index}>{item}</p>
      })}
      <ButtonGroup
        options={[
          {
            name: "radiobutton",
            value:"1",
              checked: false,
              label: "Here is the First radio button"
          },
          {
            name: "radiobutton",
            value:"2",
              checked: false,
              label: "Here is the Second radio button"
          }
        ]}
        onChange={this.radioButtonsOnChange}
        value={[]}
        label={<h2>Button Group 2: Radio Buttons</h2>}
        multiple={false}
      />
      <h4>Selected Values:</h4>
      {this.state.values2.map((item, index) => {
        return <p key={index}>{item}</p>
      })}
    </div>
  )
}}