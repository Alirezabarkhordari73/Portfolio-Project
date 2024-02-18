import React from "react";
import "./bControls.css";

export const LabeledTextBox = React.forwardRef(
  (
    {
      value,
      onChange,
      style,
      lstyle,
      tstyle,
      label,
      placeholder,
      readOnly,
      className = "",
      type,
      rows = 1,
      name,
      ...props
    },
    ref
  ) => {
    if (!placeholder) placeholder = label;
    return (
      <div
        className={
          className + " LabeledTextBox" + (readOnly ? " readonly" : "")
        }
        style={style}
      >
        <label style={lstyle}>
          <input
            {...props}
            ref={ref}
            type={type ? type : "text"}
            value={value}
            placeHolder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            style={tstyle}
            name={name}
          />
          {label ? <span>{label}</span> : ""}
        </label>
      </div>
    );
  }
);

export const LabeledTextArea = React.forwardRef(
  (
    {
      value,
      rows,
      onChange,
      style,
      lstyle,
      tstyle,
      label,
      placeholder,
      readOnly,
      className = "",
      type,
      name,
      ...props
    },
    ref
  ) => {
    if (!placeholder) placeholder = label;
    return (
      <div
        className={
          className + " LabeledTextArea" + (readOnly ? " readonly" : "")
        }
        style={{ height: `calc(${rows * 2}em + 20px)`, ...style }}
      >
        <label style={lstyle}>
          <textarea
            className={!value ? "empty" : ""}
            rows={rows}
            type="text"
            value={value}
            placeHolder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            style={tstyle}
            name={name}
            ref={ref}
            spellcheck="false"
          />
          {label ? <span>{label}</span> : ""}
        </label>
      </div>
    );
  }
);

export const IntProgress = (props) => {
  return (
    <div className="IntProgress">
      {" "}
      <div
        className="Progress"
        style={{ width: (props.value * 100) / props.max + "%" }}
      ></div>{" "}
    </div>
  );
};

export const WizardProgress = ({ items, current }) => {
  return (
    <div className="WizardProgress">
      {items.map((item, i) => (
        <>
          <div className="item">
            <div
              className={
                i + 1 == current
                  ? "fcircle"
                  : i + 1 < current
                  ? "okcircle"
                  : "ecircle"
              }
            >
              {" "}
              {i + 1 < current ? "" : i + 1}{" "}
            </div>
            <div className="Text">{item}</div>
          </div>
          {i + 1 != items.length ? (
            <div className={i + 1 < current ? "rspacer" : "gspacer"} />
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
};

export const GBullet = (props) => {
  return (
    <p style={props.style} className="GBullet">
      {" "}
      {props.children}{" "}
    </p>
  );
};

export const RadioButton = (props) => {
  return (
    <label class="bradiobutton" style={props.style}>
      {" "}
      {props.text}
      <input type="radio" onClick={props.onClick} checked={props.checked} />
      <span class="checkmark"></span>
    </label>
  );
};
