// Pagination.vue
<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"><i class="fa-solid fa-arrow-left"></i> Anterior</button>
    
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente <i class="fa-solid fa-arrow-right"></i></button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number
});

const emit = defineEmits(["page-change"]);

const changePage = (page) => {
    console.log("page", page);
    
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  }
};
</script>

<style src="./Pagination.style.css" scoped></style>