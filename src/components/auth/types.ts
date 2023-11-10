import { ValidationRule } from '@vuelidate/core'

export interface LoginFormState {
  email: string
  password: string
}

export interface LoginFormRules {
  email: { required: ValidationRule; email: ValidationRule }
  password: { required: ValidationRule }
}

export interface RegistrationFormState extends LoginFormState {
  fullName: string
  confirmPassword: string
}

export interface RegistrationFormRules extends LoginFormRules {
  fullName: { required: ValidationRule; minLength: ValidationRule }
  confirmPassword: { required: ValidationRule; sameAsPassword: ValidationRule }
}
