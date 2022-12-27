import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FormInput({
  name,
  rules,
  defaultValue,
  type = "text",
  control,
  errors,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
    //   rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, onBlur, name } }) => (
        <TextField
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
          type={type}
          {...props}
          size="small"
        />
      )}
    />
  );
}

export default FormInput;
