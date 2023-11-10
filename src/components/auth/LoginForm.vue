<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useNotification } from '@kyvg/vue3-notification'

import { useMutation } from '@vue/apollo-composable'
import { LOGIN, login, LOGIN_VARIABLES } from '../../services/apollo/mutations/auth/login'
import * as authService from '../../services/authService'

import MyInput from '../UI/MyInput.vue'
import { LoginFormRules, LoginFormState } from './types'

const { notify } = useNotification()
const formValues = reactive<LoginFormState>({
  email: '',
  password: ''
})

const rules = reactive<LoginFormRules>({
  email: { required, email },
  password: { required }
})
const v$ = useVuelidate<LoginFormState, LoginFormRules>(rules, formValues)

const { mutate } = useMutation<LOGIN, LOGIN_VARIABLES>(login)

const handleLogin = async (event: Event) => {
  try {
    event.preventDefault()
    v$.value.$touch()

    if (!v$.value.$invalid) {
      const { data } = await mutate(formValues)
      authService.login(data.login)
    } else {
      notify({
        title: 'Validation failed.',
        type: 'error'
      })
    }
  } catch (error) {
    notify({
      title: 'Login or password is incorrect, please try again.',
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="px-5">
    <h2 class="text-3xl text-center mb-4">Login Form</h2>
    <form @submit.prevent="handleLogin" class="gap-4 flex flex-col snap-y mb-10">
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
        id="password"
        label="Password"
        type="password"
        placeholder="************"
        v-model="formValues.password"
        :error="v$.password.$error && v$.password.required.$invalid ? 'Password is required' : ''"
      />
      <button type="submit" class="btn">Login</button>
    </form>
    <a
      @click="$emit('toggleAuthType')"
      class="dark:text-blue-300 text-blue-700 cursor-pointer text-center"
    >
      Do you haven't an account yet? Go to the registration.
    </a>
  </div>
</template>

<style scoped></style>
