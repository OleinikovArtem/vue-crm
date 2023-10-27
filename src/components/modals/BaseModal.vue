<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{ show: boolean }>()

const stopPropagation = (event: Event) => {
  event.stopPropagation()
}
</script>

<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-mask" @click="$emit('close')">
      <div class="modal-container" @click="stopPropagation">
        <button class="modal-default-button" @click="$emit('close')">
          <Icon icon="ph:x-fill" />
        </button>
        <div class="modal-header">
          <slot name="header"></slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"> default footer</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  @apply relative min-w-[300px] m-auto pt-7 rounded bg-gray-300 dark:bg-gray-800 max-h-[90vh];
  transition: all 0.3s ease;
}

.modal-header {
  @apply px-5 pb-3;
}

.modal-body {
  @apply my-0 p-5 border-b border-t border-gray-300 dark:border-gray-700;
  overflow-y: auto;

  max-height: calc(90vh - 144px);
}
.modal-footer {
  @apply p-5;
}

.modal-default-button {
  @apply absolute right-3 top-3;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
