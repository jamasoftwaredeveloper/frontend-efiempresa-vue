import { defineStore } from "pinia";
import cartService from "../services/Cart/cart.service";
import { ref } from "vue";
import type { CartResponse } from "../types/cartResponse";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<CartResponse>({ total: 0, items: [] });
  // Cargar carrito desde la API
  async function fetchCart() {
    try {
      const response = await cartService.getCart();
      cart.value = response; // Guarda toda la respuesta, incluyendo `total`
        console.log("cart", cart.value);
        
      // total.value = Math.round(response.total * 100) / 100;
      /*cart.value.items = response.items.map(item => ({
          ...item.product,
          quantity: item.quantity,
          image: item.product.image
      }));*/
    } catch (error) {
      console.error("Error al cargar el carrito", error);
    }
  }

  return { cart, fetchCart };
});
