import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, InferType } from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import DefaultButton from "@/components/DefaultButton";
import TransparentTextAreaField from "@/components/fields/TransparentTextAreaField";

import { useCreatePost } from "../hooks/useCreatePost";

const createPostSchema = object({
  content: string().required("Required field"),
});

type CreatePostFields = InferType<typeof createPostSchema>;

const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(createPostSchema),
  });

  const { isMutating, createPost } = useCreatePost(() => {
    reset({
      content: "",
    });
  });

  const onSubmit: SubmitHandler<CreatePostFields> = (values) => {
    createPost(values);
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-xl bg-white bg-opacity-[.05] p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-xl">Create new Post</h2>
      <TransparentTextAreaField
        register={register}
        fieldName="content"
        placeholder="Content"
        errors={errors}
      />
      <DefaultButton buttonType="submit" isDisabled={isMutating}>
        Create
      </DefaultButton>
    </form>
  );
};

export default CreatePostForm;
