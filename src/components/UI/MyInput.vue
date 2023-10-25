<script setup lang="ts">
const props = defineProps<{
  label: string
  id: string
  placeholder: string
  required?: boolean
  modelValue?: string
}>()
</script>

<template>
  <div>
    <label :for="props.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      props.label
    }}</label>
    <input
      type="text"
      :id="props.id"
      :placeholder="props.placeholder"
      :required="props.required"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
</template>

<style scoped></style>
