import classNames from "classnames";
import React from "react";
import {
  UseFormRegister,
  Path,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

type Props<Fields extends FieldValues> = {
  register: UseFormRegister<Fields>;
  fieldName: Path<Fields>;
  errors: FieldErrors<Fields>;
  placeholder?: string;
};

const TransparentTextAreaField = <Fields extends FieldValues>({
  register,
  fieldName,
  errors,
  placeholder,
}: Props<Fields>) => (
  <div>
    <div
      className={classNames(
        "relative mt-1",
        "before:content-[''] before:absolute before:top-1 before:left-0 before:bottom-1 before:w-[2px] before:rounded-2xl",
        !errors[fieldName]?.message ? "before:bg-warning" : "before:bg-error",
      )}
    >
      <textarea
        className="w-full rounded-xl bg-transparent px-2 py-1 outline-none"
        placeholder={placeholder}
        rows={3}
        {...register(fieldName)}
      />
    </div>
    <label className="label py-0">
      <span className="label-text-alt text-error">
        {errors[fieldName]?.message?.toString() ?? ""}
      </span>
    </label>
  </div>
);

export default TransparentTextAreaField;
