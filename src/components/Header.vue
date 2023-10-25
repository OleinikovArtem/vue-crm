<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import { routes } from '../router'
</script>

<template>
  <header class="flex justify-between">
    <ThemeToggle />
    <nav class="flex justify-center gap-4">
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path">{{ route?.name }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.active-link {
  @apply underline;
}
</style>
