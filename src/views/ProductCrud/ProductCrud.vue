<template src="./ProductCrud.template.html"></template>
<script lang="ts" setup>
import { useProductCrud } from './useProductCrud.ts'

const { products,
    productForm,
    handleSubmit,
    editProduct,
    deleteProduct,
    cancelEdit,
    loadProducts } = useProductCrud()

    
</script>
<style src="./ProductCrud.style.css" scoped></style>