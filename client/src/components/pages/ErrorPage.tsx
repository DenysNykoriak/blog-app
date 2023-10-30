import React from "react";

type Props = {
  text: string;
};

const ErrorPage = ({ text }: Props) => (
  <div className="flex w-screen flex-1 items-center justify-center">
    <h1 className="text-3xl">{text}</h1>
  </div>
);

export default ErrorPage;
