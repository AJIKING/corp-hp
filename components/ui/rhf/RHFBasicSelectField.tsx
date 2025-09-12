'use client'
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
} from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Option = { value: string; label: string }

type RHFBasicSelectFieldProps<T extends FieldValues> = Omit<SelectProps, 'name'> &
  UseControllerProps<T> & {
    label: string
    values: Option[]
    helperText?: string
  }

export const RHFBasicSelectField = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  values,
  helperText,
  required,
  ...rest
}: RHFBasicSelectFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    let v: unknown = e.target.value
    if (v === 'true') v = true
    if (v === 'false') v = false
    field.onChange(v)
  }

  return (
    <FormControl fullWidth>
      <Typography sx={{ py: 0.5 }} variant="body2" component="label" display="flex">
        {label}
        {required && <Typography sx={{ color: 'error.main' }}>*</Typography>}
      </Typography>

      <Select
        {...rest}
        required={required}
        value={field.value}
        name={field.name}
        inputRef={field.ref}
        onBlur={field.onBlur}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled sx={{ whiteSpace: 'normal', fontSize: 16 }}>
          選択してください
        </MenuItem>
        {values.map((v: Option) => (
          <MenuItem
            key={String(v.value)}
            value={v.value}
            sx={{ whiteSpace: 'normal', fontSize: 16 }}
          >
            {v.label}
          </MenuItem>
        ))}
      </Select>
      {!!helperText && <FormHelperText id="name-helper">{helperText}</FormHelperText>}
      {!!error && (
        <FormHelperText id="name-error" sx={{ color: 'error.main' }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}
