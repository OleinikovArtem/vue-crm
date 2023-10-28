<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import ProductCard from '../components/ProductCard.vue'

import {
  getProducts,
  GET_PRODUCTS,
  defaultResultGetProducts
} from '../services/apollo/queries/products/getProducts'
import CreateProduct from '../components/modals/CreateProduct.vue'

const { result, refetch } = useQuery<GET_PRODUCTS>(getProducts)
const productsData = computed(() => result.value?.products ?? defaultResultGetProducts)
</script>

<template>
  <main>
    <CreateProduct @refresh="refetch" />
    <div>
      <div>Pages: {{ productsData.totalCount }}</div>
      <div>Current page: {{ productsData.currentPage }}</div>
      <div>Total items: {{ productsData.totalCount }}</div>
    </div>

    <div class="flex flex-wrap gap-4">
      <ProductCard v-for="product in productsData.items" :product="product" />
    </div>
  </main>
</template>
