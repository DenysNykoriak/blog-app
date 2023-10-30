"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, InferType, string } from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import DefaultButton from "@/components/DefaultButton";
import DefaultInputField from "@/components/fields/DefaultInputField";
import { Route } from "@/models/routes";

import { useSignIn } from "../hooks/useSignIn";

const signInSchema = object({
  email: string().required("Required field").email("Should be valid email"),

  password: string().required("Required field"),
});

type SignInFields = InferType<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFields>({
    mode: "onSubmit",
    resolver: yupResolver(signInSchema),
  });

  const { isMutating, trigger: signIn } = useSignIn(
    () => {
      router.push(Route.Profile);
    },
    (errors) => {
      if (errors.includes("Invalid email or password")) {
        setError("password", { message: "Invalid email or password" });
      }
    },
  );

  const onSubmit: SubmitHandler<SignInFields> = (values) => {
    signIn(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[400px] flex-col gap-2"
    >
      <DefaultInputField
        register={register}
        fieldName="email"
        placeholder="Email"
        errors={errors}
      />
      <DefaultInputField
        register={register}
        fieldName="password"
        placeholder="Password"
        errors={errors}
      />
      <DefaultButton buttonType="submit" isDisabled={isMutating}>
        Send
      </DefaultButton>
    </form>
  );
};

export default SignInForm;
