<!-- src/components/ProductCard.vue -->
<template>
    <div class="product-card" :key="product.id">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h3>Codigo:</h3> {{ product.ean }}
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">$ {{ product.price }}</p>
        <button @click="addToCart(product)" class="add-to-cart-btn">
            <i class="fas fa-cart-plus"></i>
            <span>Agregar al carrito</span>
        </button>
    </div>
</template>

<script setup>
defineProps({
    product: Object, // Recibe el producto como propiedad
});
import cartService from "../../services/Cart/cart.service";
const emit = defineEmits(["cartUpdated"]);

const addToCart = async (product) => {
    try {
        await cartService.addCart({
            "product_id": product.id,
            "quantity": 1
        })

        emit("cartUpdated");
    } catch (error) {
        console.error('Error en registro:', error)
    }
    console.log("Producto agregado:", product.name);
}



</script>

<style src="./ProductCard.style.css" scoped></style>