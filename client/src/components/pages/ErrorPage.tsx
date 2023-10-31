import React from "react";

type Props = {
  text: string;
};

const ErrorPage = ({ text }: Props) => (
  <main className="flex w-screen flex-1 items-center justify-center">
    <h1 className="text-3xl">{text}</h1>
  </main>
);

export default ErrorPage;
