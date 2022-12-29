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
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          name={name}
          value={value}
          type={type}
          onChange={(ev) => {
            onChange(ev.target.value);
          }}
          error={errors && errors[name] ? true : false}
          helperText={errors && errors[name] ? errors[name].message : ""}
          {...props}
          size="small"
        />
      )}
    />
  );
}

export default FormInput;
