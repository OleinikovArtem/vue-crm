<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'

import BaseModal from './BaseModal.vue'
import MyInput from '../UI/MyInput.vue'
import MyTextarea from '../UI/MyTextarea.vue'
import FileInput from '../UI/FileInput.vue'

import { createProduct } from '../../services/apollo/mutations/products/createProduct'
import { uploadSingle } from '../../services/files/uploadSingle'

const emit = defineEmits()
const showModal = ref(false)
const formValues = reactive({
  name: '',
  description: '',
  price: '',
  count: '',
  image: null
})

const { mutate } = useMutation(createProduct)

const handleCreateProduct = async () => {
  try {
    showModal.value = false
    const { image, ...values } = formValues

    const { file_url } = await uploadSingle(image)

    await mutate({
      ...values,
      price: Number(values.price),
      count: Number(values.count),
      imageUrl: file_url
    })

    clearFormValues()

    emit('refresh')
  } catch (error) {
    console.log(error)
  }
}

const setImage = (files: File[] | null) => {
  formValues.image = files?.[0] || null
}

function clearFormValues() {
  formValues.name = ''
  formValues.description = ''
  formValues.price = ''
  formValues.count = ''
  formValues.image = null
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
        <MyInput
          id="productCount"
          label="Count"
          placeholder="Count of your product"
          v-model="formValues.count"
        />
      </form>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button @click="showModal = false">Cancel</button>
        <button @click="handleCreateProduct" class="btn">Create</button>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped></style>
