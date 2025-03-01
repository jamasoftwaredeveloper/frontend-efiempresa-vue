// src/services/product.service.ts
import axios from "axios";
import type { Product } from "../../types/product";
import { getHeaders } from "../../utils/api";
import type { Cart } from "../../types/cart";
import Swal from "sweetalert2";
import type { CartResponse } from "../../types/cartResponse";
/* Define la URL base de la API, puedes configurarla en un archivo .env */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/* Exporta un objeto con métodos para cada operación CRUD */
export default {
  // Obtiene todos los productos
  async getCart(): Promise<CartResponse> {
    const response = await axios.get(`${API_URL}/cart`, getHeaders());
    return response.data;
  },

  // Crea un nuevo producto
  async addCart(cart: Cart): Promise<Cart> {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      cart,
      getHeaders()
    );
    Swal.fire({
      title: "¡Éxito!",
      text: "El producto se adiciono con éxito.",
      icon: "success",
      confirmButtonText: "OK",
    });
    return response.data.data;
  },

  async removeFromCart(productId: number): Promise<Cart> {
    const response = await axios.delete(
      `${API_URL}/cart/remove/` + productId,
      getHeaders()
    );
    Swal.fire({
      title: "¡Éxito!",
      text: "El producto se removio con éxito.",
      icon: "success",
      confirmButtonText: "OK",
    });
    return response.data.data;
  },
  async payCart(data: object) {
    let resultado;

    Swal.fire({
      title: "Eliminando carrito...",
      text: "Por favor, espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post(`${API_URL}/start-pay`, data, getHeaders())
      .then((response) => {
        resultado = response.data;
        this.removeCart();
        // Aquí puedes hacer algo con resultado
      })
      .catch((error) => {
        console.error(
          "Error en la solicitud:",
          error.response ? error.response.data : error.message
        );
      });
  },
  async removeCart() {
    axios
      .post(`${API_URL}/delete-cart`, {}, getHeaders())
      .then((response) => {
        console.log("response", response);
        Swal.fire({
          title: "¡Éxito!",
          text: "El pago se realizo con exito.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error(
          "Error en la solicitud:",
          error.response ? error.response.data : error.message
        );
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el carrito.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  },
};
