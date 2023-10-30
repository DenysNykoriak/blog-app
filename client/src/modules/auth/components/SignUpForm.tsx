"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, InferType, string } from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import DefaultButton from "@/components/DefaultButton";
import DefaultInputField from "@/components/fields/DefaultInputField";
import { Route } from "@/models/routes";

import { useSignUp } from "../hooks/useSignUp";

const signUpSchema = object({
  fname: string()
    .required("Required field")
    .min(3, "First name is too short")
    .max(30, "First name is too long"),

  lname: string()
    .required("Required field")
    .min(3, "Last name is too short")
    .max(30, "Last name is too long"),

  email: string().required("Required field").email("Should be valid email"),

  nickname: string()
    .required("Required field")
    .min(3, "Nickname is too short")
    .max(30, "Nickname is too long"),

  password: string()
    .required("Required field")
    .min(8, "Password is weak")
    .max(60, "Password is too long")
    .matches(/^(?=.*[0-9])(?=.*[A-Z]).{8,}$/, { message: "Password is weak" }),
});

type SignUpFields = InferType<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFields>({
    mode: "onSubmit",
    resolver: yupResolver(signUpSchema),
  });

  const { isMutating, trigger: signUp } = useSignUp(
    () => {
      router.push(Route.Profile);
    },
    (errors) => {
      if (errors.includes("Email already taken")) {
        setError("email", { message: "Email already taken" });
      }

      if (errors.includes("Nickname already taken")) {
        setError("nickname", { message: "Nickname already taken" });
      }
    },
  );

  const onSubmit: SubmitHandler<SignUpFields> = (values) => {
    signUp(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[400px] flex-col gap-2"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <DefaultInputField
          register={register}
          fieldName="fname"
          placeholder="First Name"
          errors={errors}
        />
        <DefaultInputField
          register={register}
          fieldName="lname"
          placeholder="Last Name"
          errors={errors}
        />
      </div>
      <DefaultInputField
        register={register}
        fieldName="email"
        placeholder="Email"
        errors={errors}
      />
      <DefaultInputField
        register={register}
        fieldName="nickname"
        placeholder="Nickname"
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

export default SignUpForm;
