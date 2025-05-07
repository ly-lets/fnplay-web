import React, { useState } from "react";
import "./inputField.style.less";

const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  icon,
  onIconClick,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) setIsFocused(false);
  };

  const handleIconClick = () => {
    if (type === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    }
    if (onIconClick) {
      onIconClick();
    }
  };

  return (
    <div className={`input-field ${isFocused || value ? "focused" : ""}`}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="input-wrapper">
        <input
          required={required}
          id={id}
          name={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="input-element"
        />
        {icon && (
          <span className="input-icon" onClick={handleIconClick}>
            {/* {isPasswordVisible ? "🙈" : icon}  */}
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
