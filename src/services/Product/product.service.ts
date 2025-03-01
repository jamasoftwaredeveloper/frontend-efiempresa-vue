// src/services/product.service.ts
import axios from "axios";
import type { Product } from "../../types/product";
import { getHeaders } from "../../utils/api";

/* Define la URL base de la API, puedes configurarla en un archivo .env */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
interface ProductResponse {
  data: Product[];
  meta: {
    from: number;
    total: number;
    last_page: number;
    current_page: number;
    per_page: number;
  };
}

/* Exporta un objeto con métodos para cada operación CRUD */
export default {
  // Obtiene todos los productos
  async getProducts(
    page: number =1,
    search: string = "",
    priceMax: number,
    priceMin: number,
    ean: string = ""
  ): Promise<ProductResponse> {
  
    page =  typeof(page) === "object" ? 1: page;
    const response = await axios.get(
      `${API_URL}/products?page=${page}&search=${search}&price_max=${priceMax}&price_min=${priceMin}&ean=${ean}`,
      getHeaders()
    );
    return response.data;
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
