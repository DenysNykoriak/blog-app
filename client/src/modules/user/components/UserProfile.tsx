"use client";

import dayjs from "dayjs";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, InferType } from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import DefaultButton from "@/components/DefaultButton";
import TransparentInputField from "@/components/TransparentInputField";
import TransparentTextAreaField from "@/components/TransparentTextAreaField";

import { User } from "..";
import { useCurrentUserEdit } from "../hooks/useCurrentUserEdit";

import UserAvatar from "./UserAvatar";

const profileSchema = object({
  bio: string().optional().max(300, "Bio is too long"),

  email: string().required("Required field").email("Should be valid email"),

  fname: string()
    .required("Required field")
    .min(3, "First name is too short")
    .max(30, "First name is too long"),

  lname: string()
    .required("Required field")
    .min(3, "Last name is too short")
    .max(30, "Last name is too long"),

  nickname: string()
    .required("Required field")
    .min(3, "Nickname is too short")
    .max(30, "Nickname is too long"),

  password: string()
    .transform((value, originalValue) => {
      if (!value) {
        return undefined;
      }

      return originalValue;
    })
    .optional()
    .min(8, "Password is weak")
    .max(60, "Password is too long")
    .matches(/^(?=.*[0-9])(?=.*[A-Z]).{8,}$/, { message: "Password is weak" }),
});

type ProfileFields = InferType<typeof profileSchema>;

type Props = {
  user: User;
  isCurrentUserProfile?: boolean;
};

const UserProfile = ({ user, isCurrentUserProfile }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, defaultValues },
  } = useForm<ProfileFields>({
    mode: "onSubmit",
    defaultValues: {
      bio: user.bio,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      nickname: user.nickname,
    },
    resolver: yupResolver(profileSchema),
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const { isMutating, edit } = useCurrentUserEdit(
    (updatedUser) => {
      setIsEditMode(false);
      reset({
        bio: updatedUser.bio,
        email: updatedUser.email,
        fname: updatedUser.fname,
        lname: updatedUser.lname,
        nickname: updatedUser.nickname,
        password: "",
      });
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

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleEditCancel = () => {
    setIsEditMode(false);
    reset(defaultValues);
  };

  const onSubmit: SubmitHandler<ProfileFields> = (values) => {
    edit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className="flex items-center justify-between rounded-t-xl bg-primary bg-opacity-[.2] p-4">
        <div className="flex items-center gap-4">
          <UserAvatar fname={user.fname} lname={user.lname} />
          <div>
            <h1 className="text-3xl">
              {user.fname} {user.lname}
            </h1>
            <span className=" text-base-content">@{user.nickname}</span>
          </div>
        </div>
        {isCurrentUserProfile && (
          <>
            {isEditMode ? (
              <div className="flex w-full max-w-[300px] gap-2">
                <div className="w-full">
                  <DefaultButton
                    isWide
                    onClick={handleEditCancel}
                    color="error"
                    buttonType="button"
                  >
                    Cancel Edit
                  </DefaultButton>
                </div>
                <div className="w-full">
                  <DefaultButton
                    isWide
                    buttonType="submit"
                    color="success"
                    isDisabled={isMutating}
                  >
                    Save
                  </DefaultButton>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[150px]">
                <DefaultButton isWide onClick={toggleEditMode}>
                  Edit
                </DefaultButton>
              </div>
            )}
          </>
        )}
      </header>
      <div className="flex flex-col gap-3 rounded-b-xl bg-white bg-opacity-[.05] p-4">
        <div>
          <h3 className="text-xl text-primary">Bio</h3>
          {isEditMode ? (
            <TransparentTextAreaField
              register={register}
              fieldName="bio"
              errors={errors}
              placeholder="Bio"
            />
          ) : (
            <span className="break-words">{user.bio || "-"}</span>
          )}
        </div>
        <div>
          <h3 className="text-xl text-primary">Email</h3>
          {isEditMode ? (
            <TransparentInputField
              register={register}
              fieldName="email"
              errors={errors}
              placeholder="Email"
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div>
          <h3 className="text-xl text-primary">Created At</h3>
          <span>{dayjs(user.createdAt).format("MMMM D, YYYY")}</span>
        </div>
        {isEditMode && (
          <>
            <div className="divider" />
            <div>
              <h3 className="text-xl text-primary">First Name</h3>
              <TransparentInputField
                register={register}
                fieldName="fname"
                errors={errors}
                placeholder="First Name"
              />
            </div>
            <div>
              <h3 className="text-xl text-primary">Last Name</h3>
              <TransparentInputField
                register={register}
                fieldName="lname"
                errors={errors}
                placeholder="Last Name"
              />
            </div>
            <div className="divider" />
            <div>
              <h3 className="text-xl text-primary">Nickname</h3>
              <TransparentInputField
                register={register}
                fieldName="nickname"
                errors={errors}
                placeholder="Nickname"
              />
            </div>
            <div className="divider" />
            <div>
              <h3 className="text-xl text-primary">New Password</h3>
              <TransparentInputField
                register={register}
                fieldName="password"
                errors={errors}
                placeholder="Password"
              />
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default UserProfile;
