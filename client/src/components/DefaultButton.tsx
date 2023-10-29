import React, { ButtonHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isDisabled?: boolean;
};

const DefaultButton = ({ children, isDisabled, buttonType }: Props) => (
  <button className="btn btn-primary" disabled={isDisabled} type={buttonType}>
    {children}
  </button>
);

export default DefaultButton;
