import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FormInput({
  name,
  rules,
  defaultValue,
  type = "text",
  control,
  errors,
  formValue,
  onChangeText,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur } }) => (
        <TextField
          name={name}
          value={formValue}
          type={type}
          onChange={(ev) => {
            onChange(ev.target.value);
            onChangeText(ev);
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
