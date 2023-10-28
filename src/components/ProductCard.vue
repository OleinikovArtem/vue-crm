<script setup lang="ts">
import { Product } from '../models/Product'

const { product } = defineProps<{
  product: Product
}>()

const addToCart = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  console.log('TODO: add product to cart', product)
}
</script>

<template>
  <router-link :to="{ name: 'product', params: { id: product.id } }"
    >{{ product.name }}
    <div
      class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img class="p-8 rounded-t-lg" :src="product.imageUrl" :alt="product.name" />
      <div class="px-5 pb-5">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {{ product.name }}
        </h5>
        <div class="flex items-center mt-2.5 mb-5">
          <p>{{ product.description }}</p>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ product.price }}$</span>
          <button @click="addToCart" class="btn">Add to cart</button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped></style>
