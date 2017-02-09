import React from "react"

const CheckButton = (props) => {
    return (
      <div>
        <input type="checkbox"
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange} />
        {props.label}
      </div>
    )
}

CheckButton.propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.node,
    checked: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func,
    label: React.PropTypes.node,
}

export default CheckButton