<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import {
  defaultResultGetProducts,
  GET_PRODUCTS,
  getProducts
} from '../services/apollo/queries/products/getProducts'

import Pagination from './UI/Pagination.vue'

import ProductCard from './ProductCard.vue'
import CreateProduct from './modals/CreateProduct.vue'

const { result, refetch } = useQuery<GET_PRODUCTS>(getProducts, {
  limit: 6,
  page: 1
})
const productsData = computed(() => result.value?.products ?? defaultResultGetProducts)

function setPage(page) {
  if (page < 1 || page > productsData.totalPages || page === productsData.currentPage) return
  refetch({ page })
}
</script>

<template>
  <div>
    <div class="flex justify-between align-center py-8">
      <CreateProduct @refresh="refetch" />
      <h3>Total pages: {{ productsData.totalPages }}</h3>
    </div>

    <div class="grid-cols-3 grid gap-8">
      <ProductCard v-for="product in productsData.items" :product="product" />
    </div>
    <Pagination
      @setPage="setPage"
      :total-pages="productsData.totalPages"
      :current-page="productsData.currentPage"
      :total-count="productsData.totalCount"
    />
  </div>
</template>

<style scoped></style>
