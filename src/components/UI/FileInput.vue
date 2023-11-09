<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{ image: File | null }>()
const imageUrl = computed(() => (props.image ? URL.createObjectURL(props.image) : ''))
</script>

<template>
  <div class="flex items-center justify-center h-64 w-64 md:h-80 md:w-96">
    <div v-if="imageUrl" class="rounded-lg relative w-full h-full overflow-hidden">
      <button
        @click="$emit('setFile', null)"
        class="absolute bottom-3 right-3 rounded-full bg-sky-200 p-2 border border-red-500 cursor-pointer"
      >
        <Icon icon="jam:trash" width="30" height="30" class="text-red-500" />
      </button>
      <img :src="imageUrl" loading="lazy" alt="" class="rounded-lg object-cover" />
    </div>
    <label
      v-if="!imageUrl"
      for="fileInput"
      class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <span class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 400x400px)
        </span>
      </span>
    </label>
    <input
      id="fileInput"
      type="file"
      @change="$emit('setFile', $event.target.files)"
      class="hidden"
    />
  </div>
</template>

<style scoped></style>
