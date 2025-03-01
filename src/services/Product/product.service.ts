// src/services/product.service.ts
import axios from "axios";
import type { Product } from "../../types/product";
import { getHeaders } from "../../utils/api";

/* Define la URL base de la API, puedes configurarla en un archivo .env */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/* Exporta un objeto con métodos para cada operación CRUD */
export default {
  // Obtiene todos los productos
  async getProducts(): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products`, getHeaders());
    return response.data.data;
  },

  // Obtiene un producto por su EAN
  async getProduct(ean: string): Promise<Product> {
    const response = await axios.get(
      `${API_URL}/products/${ean}`,
      getHeaders()
    );
    return response.data.data;
  },

  // Crea un nuevo producto
  async createProduct(product: Product): Promise<Product> {
    const response = await axios.post(
      `${API_URL}/products`,
      product,
      getHeaders()
    );
    return response.data.data;
  },

  // Actualiza un producto existente usando su EAN
  async updateProduct(ean: string, product: Product): Promise<Product> {
    const response = await axios.put(
      `${API_URL}/products/${ean}`,
      product,
      getHeaders()
    );
    return response.data.data;
  },

  // Elimina un producto por su EAN
  async deleteProduct(ean: string): Promise<void> {
    await axios.delete(`${API_URL}/products/${ean}`, getHeaders());
  },
};
