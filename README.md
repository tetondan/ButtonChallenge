# ButtonGroup Challenge

## Objective
##### Creating three components that will be used compositionally:

  - CheckButton
  - RadioButton
  - ButtonGroup (uses the buttons above)

##### CheckButton & RadioButton should accept the following props:

  - name: string
  - value: any
  - checked: bool
  - label: (string | element | component)
  - onChange: func 
    - The 'onChange' argument, if not using the synthetic event directly, should closely model it's structure.)

##### ButtonGroup (Uses CheckButton & RadioButton to render based on props) should accept the following props:

  - name: string
  - options: arrayOf(object) 
    - Rendered as buttons (same keys as the props above)
  - value: (optional) 
    - Represents currently selected value(s) when used as a controlled input. This could be left out in favor of using 'checked' prop on options, it's up to you.
  - multiple: bool
    - Indicates weather to use radio or check.
  - implyAll: bool
    - Renders an 'all' button that is checked if no value or checked options.
  - implyNone: bool
    - Renders a 'none' button that is checked if no value or checked options.
  - label: (string | element | component)
  - onChange
    - The 'onChange' argument, if not using the synthetic event directly, should closely model it's structure.
##### Optional:
  
  - Build the components such that controlling them was optional (held it's own state if needed).
  - Allow an 'accessor' property that accepts an object with keys representing the button props, where the value on each key is a function or keypath used as a 'getter' on object passed to 'options' and/or 'value'.
  - Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

### Requirements :
  
  - Node v4.0^
 
### Running the Demo:
  - In the console, from the project root directory:    
    - "npm install -g webpack"
    - "npm install"
    - "npm run build"
  - In your web browser:
    - http://localhost:8080/  
