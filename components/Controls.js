import React from "react";
import "./Controls.css";

export const Button = (props) => {
  return (
    <button
      className={"btn" + (props.secondary ? " secondary" : "")}
      disabled={props.disabled}
      style={props.style}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      {props.iconAfter ? props.text : ""}
      {props.icon ? <i className={"icon " + props.icon} /> : ""}
      {props.iconAfter ? "" : props.text}
    </button>
  );
};

export const TickBox = (props) => {
  return (
    <label
      className={"checkbox " + props.className}
      style={props.style}
      onMouseMove={props.onMouseMove}
    >
      {props.text}
      <input type="checkbox" onChange={props.onChange} checked={props.value} />
      <span class="checkmark"></span>
    </label>
  );
};

export const TextBox = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type={props.type ? props.type : "text"}
      className="TextBox"
      value={props.value}
      placeHolder={props.placeHolder}
      onChange={props.onChange}
      readOnly={props.readOnly}
      style={props.style}
    />
  );
});
