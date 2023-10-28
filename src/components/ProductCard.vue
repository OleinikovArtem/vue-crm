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
  <router-link :to="{ name: 'product', params: { id: product.id } }" class="wrapper">
    <div class="h-full">
      <div class="w-full overflow-hidden h-64 md:h-80">
        <img class="rounded-lg object-cover w-full" :src="product.imageUrl" :alt="product.name" />
      </div>
      <div class="content">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {{ product.name }}
        </h5>
        <div class="text-sm flex items-center text-gray-800 dark:text-gray-300 mb-auto">
          <p class="description">{{ product.description }}</p>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ product.price }}$</span>
          <button @click="addToCart" class="btn">Add to cart</button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.wrapper {
  @apply h-[520px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700;
}

.content {
  @apply px-4 py-4 flex flex-col;
  height: calc(100% - 256px);
}

@media (min-width: 768px) {
  .content {
    height: calc(100% - 320px);
  }
}

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
