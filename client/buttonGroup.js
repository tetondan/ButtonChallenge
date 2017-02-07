import React, { Component } from 'react';
import RadioButton from './radioButton';
import CheckButton from './checkButton';

export default class ButtonGroup extends Component {
  constructor(props){
    super(props)
    /*props = 
    Uses CheckButton & RadioButton to render based on props.
    Should accept the following props:

    name: string

    options: arrayOf(object)
    Rendered as buttons (same keys as the props above).

    value: (optional)
    Represents currently selected value(s) when used as a controlled input. This could be left out in favor of using 'checked' prop on options, it's up to you.

    multiple: bool
    Indicates weather to use radio or check.

    implyAll: bool
    Renders an 'all' button that is checked if no value or checked options.

    implyNone: bool
    Renders a 'none' button that is checked if no value or checked options.

    label: (string | element | component)

    onChange
    The 'onChange' argument, if not using the synthetic event directly, should closely model it's structure.
    */

  }

  render(){
    return (
      <div>
        
      </div>
    )
  }
}

// {this.props.options.map((item) => {
//   if(item.type === "radio"){
//     return (
//       <RadioButton
//         name={item.name}
//         value={item.value}
//         checked={item.checked}
//         onChange={item.onChange}
//       />
//     )
//   } else {
//     return (
//       <CheckButton

//       />
//     )
//   }
//})}
//implyAll button
//implyNone button