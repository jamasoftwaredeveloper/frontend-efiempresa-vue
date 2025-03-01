<template>
    <div :class="['cart-sidebar', { open: isOpen }]">
        <button @click="$emit('toggle')" class="close-cart-btn">✖</button>
        <h2>🛒 Carrito</h2>
        <p v-if="items.length === 0" class="empty-msg">Tu carrito está vacío.</p>
        <ul v-else>
            <li v-for="(item, index) in items" :key="index" class="cart-item">
                <img :src="item.image" :alt="item.name" class="cart-item-image" />
                <div class="cart-item-details">
                    <p class="cart-item-name">{{ item.name }}</p>
                    <p class="cart-item-price">$ {{ item.price }}</p>
                    <p class="cart-item-quantity">Cantidad: {{ item.quantity }}</p>
                    <div class="cart-actions">
                        <button @click="$emit('increase', item)" class="cart-btn">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button @click="$emit('remove', item)" class="cart-btn delete">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
        <p v-if="items.length > 0" class="cart-total">Total: ${{ total.toFixed(2) }}</p>
        <!-- Botón de pagar -->
        <button v-if="items.length > 0" @click="$emit('pay')" class="pay-btn">Pagar</button>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    items: { type: Array, default: () => [] },
    total: { type: Number, default: 0 },
    isOpen: { type: Boolean, default: false }
});
</script>

<style src="./Cart.style.css" scoped></style>