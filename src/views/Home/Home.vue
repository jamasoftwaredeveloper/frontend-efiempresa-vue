<template>
    <ProductList :products="products" @cartUpdated="cartUpdated" />
    <button @click="toggleCart" class="cart-toggle-btn">🛒</button>
    <Cart :items="cart" :total="total" :isOpen="isCartOpen" @toggle="toggleCart" @increase="increaseQuantity"
        @remove="removeFromCart" @pay="openPaymentModal" />

    <!-- Modal de pago -->
    <PaymentModal :visible="isPaymentModalOpen" :total="total" @close="isPaymentModalOpen = false"
        @submitPayment="handlePayment" />
</template>

<script setup>
import { ref, onMounted } from "vue";

import cartService from "../../services/Cart/cart.service";
import Cart from "../Cart/Cart.vue";
import PaymentModal from "../Pay/PaymentModal.vue";
import ProductList from "../ProductList/ProductList.vue";

const cart = ref([]);
const total = ref(0);
const isCartOpen = ref(false);
const isPaymentModalOpen = ref(false);

const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
    getCart();
};

function cartUpdated() {
    getCart();
}

const getCart = async () => {
    try {
        const response = await cartService.getCart();
        total.value = Math.round(response.total * 100) / 100;
        cart.value = response.items.map(item => ({
            ...item.product,
            quantity: item.quantity,
            image: item.product.image
        }));
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
    }
};

onMounted(() => {
    getCart();
});

const increaseQuantity = async (product) => {
    try {
        await cartService.addCart({
            product_id: product.id,
            quantity: 1
        });
        getCart();
    } catch (error) {
        console.error("Error al aumentar la cantidad:", error);
    }
};

const removeFromCart = async (item) => {
    try {
        await cartService.removeFromCart(item.id);
        getCart();
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
};

const openPaymentModal = () => {
    isPaymentModalOpen.value = true;
    getCart();
};

const handlePayment = async (paymentData) => {
    try {
        // Aquí procesas el pago utilizando el servicio, enviando los datos del modal
        await cartService.payCart(paymentData);
        isPaymentModalOpen.value = false;
        // Luego, puedes actualizar el carrito o redirigir al usuario según la respuesta
        getCart();
    } catch (error) {
        console.error("Error al procesar el pago:", error);
    }
};
</script>

<style src="./Home.style.css" scoped></style>