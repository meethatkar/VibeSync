import React from "react";

/**
 * Reusable Button Component
 * Supports variants: 'primary', 'secondary', 'ghost', 'icon' (and future variants)
 */
const Button = ({
  variant = "secondary",
  className = "",
  onClick,
  title,
  "aria-label": ariaLabel,
  children,
  type = "button",
  disabled = false,
  ...rest
}) => {
  const combinedClassName = `btn btn--${variant} ${className}`.trim();

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel || title}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
