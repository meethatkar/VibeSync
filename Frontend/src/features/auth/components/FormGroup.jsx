import { useState } from "react";
import { Eye } from "../../../assets/svg/Eye";
import { EyeOff } from "../../../assets/svg/EyeOff";

const FormGroup = ({ label, placeholder, type, onEnter }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = label.toLowerCase() === "password" || type === "password";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type || label;

  return (
    <div className="form-group">
      <label htmlFor={label}> {label} </label>
      {isPassword ? (
        <div className="password-input-wrapper">
          <input
            type={inputType}
            id={label}
            required
            placeholder={placeholder}
            onChange={onEnter}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            aria-controls="password-input"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      ) : (
        <input
          type={inputType}
          id={label}
          required
          placeholder={placeholder}
          onChange={onEnter}
        />
      )}
    </div>
  );
};

export default FormGroup;
