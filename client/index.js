import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from './buttonGroup'
import CheckButton from './checkButton'
import RadioButton from './radioButton'

ReactDOM.render(
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
    	}
    ]}
    onChange={() => {return}}
    value={[]}
    label={<h2>Button Group 1: Checkboxes</h2>}
    multiple={true}
    implyAll={true}
    implyNone={false}
  />
  , document.getElementById('container'));