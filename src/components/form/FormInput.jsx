import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FormInput({
  name,
  rules,
  defaultValue,
  type = "text",
  control,
  errors,
  value,
  onChange,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      //   rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onBlur } }) => (
        <TextField
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          {...props}
          size="small"
        />
      )}
    />
  );
}

export default FormInput;
