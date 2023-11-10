<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import { useNotification } from '@kyvg/vue3-notification'

import { useMutation } from '@vue/apollo-composable'
import {
  registration,
  REGISTRATION,
  REGISTRATION_VARIABLES
} from '../../services/apollo/mutations/auth/registration'
import * as authService from '../../services/authService'

import MyInput from '../UI/MyInput.vue'
import { RegistrationFormRules, RegistrationFormState } from './types'

const { notify } = useNotification()
const formValues = reactive<RegistrationFormState>({
  email: '',
  fullName: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<RegistrationFormRules>({
  email: { required, email },
  fullName: { required, minLength: minLength(3) },
  password: { required },
  confirmPassword: { required, sameAsPassword: sameAs(computed(() => formValues.password)) }
})

const v$ = useVuelidate<RegistrationFormState, RegistrationFormRules>(rules, formValues)

const { mutate } = useMutation<REGISTRATION, REGISTRATION_VARIABLES>(registration)

const handleRegistration = async (event: Event) => {
  try {
    event.preventDefault()
    v$.value.$touch()

    if (!v$.value.$invalid) {
      const { data } = await mutate({
        email: formValues.email,
        password: formValues.password,
        name: formValues.fullName
      })
      authService.login(data.registration)
    } else {
      notify({
        title: 'Validation failed.',
        type: 'error'
      })
    }
  } catch (error) {
    notify({
      title: error.message,
      type: 'error'
    })
  }
}

function getConfirmPasswordError() {
  if (!v$.value.confirmPassword.$dirty) return '' // No error message if the field has not been touched
  if (v$.value.confirmPassword.required.$invalid) return 'Confirm Password is required'
  if (v$.value.confirmPassword.sameAsPassword.$invalid) return 'Passwords do not match'
  return '' // No error message if there are no errors
}
</script>

<template>
  <div class="px-5">
    <h2 class="text-3xl text-center mb-4">Registration</h2>
    <form class="gap-4 flex flex-col snap-y mb-10">
      <MyInput
        id="email"
        label="Email"
        placeholder="example@email.com"
        v-model="formValues.email"
        :error="
          v$.email.$error && v$.email.required.$invalid
            ? 'Email is required'
            : v$.email.email.$invalid
            ? 'Please enter a valid email'
            : ''
        "
      />
      <MyInput
        id="fullName"
        label="Full name"
        placeholder="John Doe"
        v-model="formValues.fullName"
        :error="
          v$.fullName.$error && v$.fullName.required.$invalid
            ? 'Full Name is required'
            : v$.fullName.minLength.$invalid
            ? 'Full Name must be at least 3 symbols'
            : ''
        "
      />
      <MyInput
        id="password"
        label="Password"
        type="password"
        placeholder="************"
        v-model="formValues.password"
        :error="v$.password.$error && v$.password.required.$invalid ? 'Password is required' : ''"
      />
      <MyInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="************"
        v-model="formValues.confirmPassword"
        :error="getConfirmPasswordError()"
      />
      <button @click="handleRegistration" class="btn">Create a new account</button>
    </form>
    <a
      @click="$emit('toggleAuthType')"
      class="dark:text-blue-300 text-blue-700 cursor-pointer text-center"
    >
      Already have an account? Go to the login form.
    </a>
  </div>
</template>

<style scoped></style>
