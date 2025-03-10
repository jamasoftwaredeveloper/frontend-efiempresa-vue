// src/composables/useProductCrud.ts
import { reactive, ref, onMounted } from "vue";
import type { Product } from "../../types/product";
import productService from "../../services/Product/product.service";

export function useProductCrud() {
  // Array reactivo que almacenará los productos obtenidos de la API
  const products = ref<Product[]>([]);
  const meta = ref<{ current_page: number; last_page: number; page: number }>({
    current_page: 0,
    last_page: 0,
    page: 1,
  });

  // Objeto reactivo para el formulario
  const productForm = reactive<Product>({
    name: "",
    active: false,
    price: 0,
    stock: 0,
    ean: "",
  });

  // Variables para controlar el modo de edición
  const isEdit = ref(false);
  const editIndex = ref<number | null>(null);

  // Cargar productos desde la API al montar el componente
  const loadProducts = async (
    page: number = 1,
    search: string,
    priceMax: number,
    priceMin: number,
    ean: string
  ) => {
    try {
      const response = await productService.getProducts(
        page,
        search,
        priceMax,
        priceMin,
        ean
      );
      meta.value.current_page = response.meta.current_page;
      meta.value.last_page = response.meta.last_page;
      meta.value.page = response.meta.from;
      products.value = response.data;
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  onMounted(() => {
    loadProducts(meta.value.page, "", 0, 0, "");
  });

  // Función para agregar o actualizar un producto
  const handleSubmit = async (): Promise<void> => {
    try {
      if (isEdit.value && editIndex.value !== null) {
        // Actualizar el producto existente usando su EAN como identificador
        const updatedProduct = await productService.updateProduct(
          productForm.ean,
          productForm
        );
        products.value[editIndex.value] = updatedProduct;
      } else {
        // Agregar un nuevo producto a la API
        const newProduct = await productService.createProduct(productForm);
        products.value.push(newProduct);
      }
      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  // Función para iniciar el modo edición
  const editProduct = (index: number): void => {
    const product = products.value[index];
    productForm.name = product.name;
    productForm.active = product.active;
    productForm.price = product.price;
    productForm.stock = product.stock;
    productForm.ean = product.ean;
    isEdit.value = true;
    editIndex.value = index;
  };

  // Función para eliminar un producto
  const deleteProduct = async (index: number): Promise<void> => {
    try {
      const product = products.value[index];
      await productService.deleteProduct(product.ean);
      products.value.splice(index, 1);
      if (isEdit.value && editIndex.value === index) {
        resetForm();
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Función para reiniciar el formulario
  const resetForm = (): void => {
    productForm.name = "";
    productForm.active = false;
    productForm.price = 0;
    productForm.stock = 0;
    productForm.ean = "";
    isEdit.value = false;
    editIndex.value = null;
  };

  // Función para cancelar la edición
  const cancelEdit = (): void => {
    resetForm();
  };

  return {
    meta,
    products,
    productForm,
    handleSubmit,
    editProduct,
    deleteProduct,
    cancelEdit,
    loadProducts,
  };
}
