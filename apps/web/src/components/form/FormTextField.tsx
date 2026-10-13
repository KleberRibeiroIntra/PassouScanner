import type { HTMLInputTypeAttribute } from 'react'
import { PasswordInput, TextInput } from '@mantine/core'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  type?: HTMLInputTypeAttribute
  autoComplete?: string
  description?: string
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  autoComplete,
  description,
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const props = {
          ...field,
          value: field.value ?? '',
          id: field.name,
          label,
          description,
          autoComplete,
          error: fieldState.error?.message,
        }

        return type === 'password' ? <PasswordInput {...props} /> : <TextInput {...props} type={type} />
      }}
    />
  )
}
