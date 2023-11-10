<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'

import LoginForm from '../components/auth/LoginForm.vue'
import RegistrationForm from '../components/auth/RegistrationForm.vue'

const router = useRouter()
const route = useRoute()

const isLogin = ref(route.query.type ? route.query.type === 'login' : true)
const toggleAuthType = useToggle(isLogin)

watch(
  () => isLogin.value,
  () => {
    router.push({
      path: route.path,
      query: {
        type: isLogin.value ? 'login' : 'registration'
      }
    })
  }
)
</script>

<template>
  <div class="h-full min-h-screen flex flex-col justify-center">
    <div class="m-auto container flex border rounded-xl px-5">
      <!--      <div class="border-r flex-1 min-h-[80vh]"></div>-->
      <div class="flex-1 py-5">
        <LoginForm v-if="isLogin" @toggleAuthType="toggleAuthType" />
        <RegistrationForm v-if="!isLogin" @toggleAuthType="toggleAuthType" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
