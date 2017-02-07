import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from './buttonGroup'
import CheckButton from './checkButton'
import RadioButton from './radioButton'

ReactDOM.render(
  <CheckButton
    name='checkbox name'
    value='1'
    checked={false}
    onChange={function(){console.log('changed')}}
    label={<span>Label Here</span>}
  />
  , document.getElementById('container'));