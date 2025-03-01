export interface CartResponse {
    total: number;
    items: CartItem[];
  }
  
  export interface CartItem {
    product_id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      image: string;
      price: number;
    };
  }