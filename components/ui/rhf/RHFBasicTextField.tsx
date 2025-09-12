'use client'
import { Box, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type RHFBasicTextFieldProps<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    label: string
  }

export const RHFBasicTextField = <T extends FieldValues>(props: RHFBasicTextFieldProps<T>) => {
  const { name, control, rules, label, helperText, required, ...rest } = props
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })
  return (
    <Box>
      <Typography sx={{ py: 0.5 }} variant="body2" component="label" display="flex">
        {label}
        {required && <Typography sx={{ color: 'error.main' }}>*</Typography>}
      </Typography>
      <TextField
        {...rest}
        required={required}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        inputRef={field.ref}
        error={!!error}
      />
      {!!helperText && <FormHelperText id="name-helper">{helperText}</FormHelperText>}
      {!!error && (
        <FormHelperText id="name-error" sx={{ color: 'error.main' }}>
          {error.message}
        </FormHelperText>
      )}
    </Box>
  )
}
