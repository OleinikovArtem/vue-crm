<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import { navigationLinks } from '../router'
</script>

<template>
  <header class="flex justify-between border-b">
    <ThemeToggle />
    <nav>
      <ul class="flex justify-center gap-4 flex-1">
        <li v-for="route in navigationLinks">
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
