<script setup>
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()" class="p-3 border rounded-2xl bg-sky-400 dark:bg-sky-950">
    <Icon v-if="!isDark" icon="ri:sun-line" color="#ffe87c" width="24" height="24" />
    <Icon v-else icon="ri:moon-clear-line" color="#ffe87c" width="24" height="24" />
  </button>
</template>

<style lang="scss" scoped></style>
