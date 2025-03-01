<!-- src/components/ProductList.vue -->

<template>
    <div class="product-list">
        <h2>Productos disponibles</h2>
        <div v-if="products.length == 0">Cargando productos...</div>
        <div v-else class="products-grid">
            <ProductCard v-for="product in products" :key="product.id" :product="product" @cartUpdated="manejarEvento"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useProductCrud } from '../ProductCrud/useProductCrud'
import ProductCard from "../ProductCard/Index.vue"
const emit = defineEmits(["cartUpdated"]);
const { products } = useProductCrud()

function manejarEvento() {
  emit("cartUpdated");
}
</script>
<style src="./ProductList.style.css" scoped></style>