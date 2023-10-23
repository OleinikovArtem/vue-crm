<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import {
  getProducts,
  GET_PRODUCTS,
  defaultResultGetProducts
} from '../services/apollo/queries/products/getProducts'
import { computed } from 'vue'

const { result } = useQuery<GET_PRODUCTS>(getProducts)
const productsData = computed(() => result.value.products ?? defaultResultGetProducts)
</script>

<template>
  <main>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div>
      <div>Pages: {{ productsData.totalCount }}</div>
      <div>Current page: {{ productsData.currentPage }}</div>
      <div>Total items: {{ productsData.totalCount }}</div>
    </div>

    <div v-for="products in productsData.items" class="p-4 border m-2">
      <div>{{ products.name }}</div>
      <div>{{ products.description }}</div>
    </div>
  </main>
</template>
