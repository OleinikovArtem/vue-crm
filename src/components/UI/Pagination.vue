<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  totalPages: number
  currentPage: number
  totalCount: number
}

const props = defineProps<Props>()

const array = computed(() => new Array(props.totalPages))
</script>

<template>
  <nav class="flex justify-center py-8">
    <ul class="inline-flex -space-x-px text-sm">
      <li class="w-24" @click="$emit('setPage', props.currentPage - 1)">
        <a href="#" class="first">Previous</a>
      </li>
      <li v-for="(_, index) in array" @click="$emit('setPage', index + 1)">
        <a
          href="#"
          :class="{
            time: index + 1 !== props.currentPage,
            current: index + 1 === props.currentPage
          }"
          v-if="Math.abs(index + 1 - props.currentPage) < 3"
          >{{ index + 1 }}</a
        >
      </li>
      <li class="w-24" @click="$emit('setPage', props.currentPage + 1)">
        <a href="#" class="last">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.first {
  @apply flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.time {
  @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.current {
  @apply flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white;
}

.last {
  @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}
</style>
