import React from "react";
import "./styles/button.css";

function Button({ onClick, as, href, children }) {
  const buttonProps = {
    className: "button",
    onClick: onClick,
  };

  if (as === "a") {
    return (
      <a href={href} {...buttonProps}>
        {children}
      </a>
    );
  } else {
    return <button {...buttonProps}>{children}</button>;
  }
}

export default Button;
