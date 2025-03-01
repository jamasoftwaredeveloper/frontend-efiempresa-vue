<!-- src/components/ProductList.vue -->

<template>
    <div class="search-filter-container">
        <input v-model="searchQuery" placeholder="🔍 Buscar producto..." class="search-input" />
        <input v-model="priceMin" type="number" placeholder="Precio Mínimo" class="filter-input" />
        <input v-model="priceMax" type="number" placeholder="Precio Máximo" class="filter-input" />
        <input v-model="ean" type="text" placeholder="EAN" class="filter-input" />

        <button @click="fetchProducts(1)" class="search-button">Buscar <i class="fa-brands fa-searchengin"></i></button>

        <button @click="clear()" class="search-button">Limpiar <i class="fa-solid fa-broom"></i></button>
    </div>

    <Pagination v-if="products.length > 0" :currentPage="page" :totalPages="totalPages" @page-change="pagination" />
    <div class="product-list">
        <h2>Productos disponibles</h2>
        <div v-if="products.length == 0">En el momento no tenemos productos disponibles...</div>
        <div v-else class="products-grid">
            <ProductCard v-for="product in products" :key="product.id" :product="product" @cartUpdated="emitEvent" />
        </div>
        <!-- Paginación -->
    </div>
    <Pagination v-if="products.length > 0" :currentPage="page" :totalPages="totalPages" @page-change="pagination" />
</template>
<script lang="ts" setup>
import { useProductCrud } from '../ProductCrud/useProductCrud'
import ProductCard from "../ProductCard/Index.vue"
import { onMounted, ref } from 'vue';
import Pagination from '../Pagination/Pagination.vue';
import Swal from 'sweetalert2';
const emit = defineEmits(["cartUpdated"]);
const { loadProducts, products, meta } = useProductCrud()
const priceMin = ref(0);
const priceMax = ref(0);
const ean = ref("");
const searchQuery = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const page = ref(1);
function emitEvent() {
    emit("cartUpdated");
}

function pagination(pageCurrent: number) {
    page.value = pageCurrent
    fetchProducts(page.value);
}
function clear() {
    priceMin.value = 0;
    priceMax.value = 0;
    ean.value = "";
    searchQuery.value = "";
}

const fetchProducts = async (pageI: number = 1) => {
    Swal.fire({
        title: "Cargando...",
        text: "Por favor espera mientras se cargan los productos.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(); // Activa el loading
        },
    });
    try {
        await loadProducts(pageI, searchQuery.value, priceMax.value, priceMin.value, ean.value)
        currentPage.value = meta.value.current_page;
        totalPages.value = meta.value.last_page;
    } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los productos.", "error");
    } finally {
        Swal.close();
    }
};

onMounted(() => fetchProducts(currentPage.value));

</script>
<style src="./ProductList.style.css" scoped></style>