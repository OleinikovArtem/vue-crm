<script setup lang="ts">
import { reactive, ref } from 'vue'

import BaseModal from './BaseModal.vue'
import MyInput from '../UI/MyInput.vue'
import MyTextarea from '../UI/MyTextarea.vue'
import FileInput from '../UI/FileInput.vue'

const showModal = ref(false)
const formValues = reactive({
  name: '',
  description: '',
  price: '',
  image: null
})

const createProduct = () => {
  showModal.value = false
  console.log(formValues)

  formValues.name = ''
  formValues.description = ''
}

const setImage = (files: File[] | null) => {
  formValues.image = files?.[0] || null
}
</script>

<template>
  <button id="show-modal" @click="showModal = true" class="btn">Create product</button>
  <BaseModal :show="showModal" @close="showModal = false">
    <template #header><h3 class="text-2xl">Create Product</h3></template>
    <template #body>
      <form action="" class="gap-4 flex flex-col snap-y">
        <FileInput @setFile="setImage" :image="formValues.image" />
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
        <MyInput
          id="productPrice"
          label="Price"
          placeholder="Price of your product"
          v-model="formValues.price"
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
