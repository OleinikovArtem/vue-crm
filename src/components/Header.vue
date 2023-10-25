<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="flex justify-between">
    <ThemeToggle />
    <nav class="flex justify-center gap-4">
      <ul>
        <li>
          <router-link to="/"> Home </router-link>
        </li>
        <li>
          <router-link to="/product/c1c9f2a5-7b86-4e63-9784-79d32f34d7be">
            Product with rouse
          </router-link>
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
