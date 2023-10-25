<script setup lang="ts">
import { reactive, ref } from 'vue'

import BaseModal from './BaseModal.vue'
import MyInput from '../UI/MyInput.vue'
import MyTextarea from '../UI/MyTextarea.vue'

const showModal = ref(false)
const formValues = reactive({
  name: '',
  description: ''
})

const createProduct = () => {
  showModal.value = false
  console.log(formValues)

  formValues.name = ''
  formValues.description = ''
}
</script>

<template>
  <button id="show-modal" @click="showModal = true" class="btn">Create product</button>
  <BaseModal :show="showModal" @close="showModal = false">
    <template #header><h3 class="text-2xl">Create Product</h3></template>
    <template #body>
      <form action="">
        <MyInput
          id="productName"
          label="Name"
          placeholder="Name of your product"
          v-model="formValues.name"
        />
        <MyTextarea
          id="productDescription"
          label="Description"
          placeholder="Description of your product"
          v-model="formValues.description"
        />
      </form>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button @click="showModal = false">Cancel</button>
        <button @click="createProduct" class="btn">Create</button>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped></style>
