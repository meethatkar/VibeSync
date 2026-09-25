import React from "react";

const FromGroup = ({
  label,
  title,
  type = "text",
  onChange,
  required = true,
}) => {
  return (
    <div className="form-input-wrapper">
      <label htmlFor={label} className="form-label">
        {" "}
        {title}{" "}
      </label>
      <input
        id={label}
        type={type}
        className="form-input"
        required={required}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default FromGroup;
