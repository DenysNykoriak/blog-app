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

const DefaultInputField = <Fields extends FieldValues>({
  register,
  placeholder,
  fieldName,
  errors,
}: Props<Fields>) => (
  <div className="form-control w-full">
    <input
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full"
      {...register(fieldName)}
    />

    <label className="label">
      <span className="label-text-alt text-error">
        {errors[fieldName]?.message?.toString() ?? ""}
      </span>
    </label>
  </div>
);

export default DefaultInputField;
