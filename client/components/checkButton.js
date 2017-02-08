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

export default CheckButton