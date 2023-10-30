import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, InferType } from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import DefaultButton from "@/components/DefaultButton";
import TransparentTextAreaField from "@/components/fields/TransparentTextAreaField";

import { Comment, Post } from "..";
import { useCreateComment } from "../hooks/useCreateComment";

const createCommentSchema = object({
  content: string().required("Required field"),
});

type CreateCommentFields = InferType<typeof createCommentSchema>;

type Props = {
  postId: Post["id"];
  rootCommentId?: Comment["id"];
};

const CreateCommentForm = ({ postId, rootCommentId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(createCommentSchema) });

  const { isMutating, createComment } = useCreateComment(() => {
    reset({ content: "" });
  });

  const onSubmit: SubmitHandler<CreateCommentFields> = (values) => {
    createComment({
      content: values.content,
      postId,
      rootCommentId,
    });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl text-primary">
        {rootCommentId ? "Add Reply" : "Create Comment"}
      </h3>

      <TransparentTextAreaField
        register={register}
        fieldName="content"
        placeholder="Content"
        errors={errors}
      />

      <div className="self-end">
        <DefaultButton buttonType="submit" isDisabled={isMutating}>
          {rootCommentId ? "Add reply" : "Create comment"}
        </DefaultButton>
      </div>
    </form>
  );
};

export default CreateCommentForm;
