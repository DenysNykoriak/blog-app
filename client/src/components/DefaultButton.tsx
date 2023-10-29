import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

type ButtonColor = "primary" | "warning" | "error" | "success";

const colors: Record<ButtonColor, string> = {
  primary: "btn-primary",
  warning: "btn-warning",
  error: "btn-error",
  success: "btn-success",
};

type Props = {
  children: React.ReactNode;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
  isWide?: boolean;
  color?: ButtonColor;
  onClick?: () => void;
};

const DefaultButton = ({
  children,
  isDisabled,
  buttonType,
  isWide,
  color = "primary",
  onClick,
}: Props) => (
  <button
    className={classNames("btn", colors[color], {
      "w-full": isWide,
    })}
    disabled={isDisabled}
    type={buttonType}
    onClick={onClick}
  >
    {children}
  </button>
);

export default DefaultButton;
