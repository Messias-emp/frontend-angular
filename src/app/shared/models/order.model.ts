export type OrderStatus = 'PENDING' | 'PAID';
/**
  Modelo de dados para representar um pedido (Order) e seus itens (OrderItem).
  O OrderStatus é um tipo que define os possíveis status de um pedido.

export interface Order {
  id?: number;
  createdAt: string | Date;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}*/
export interface OrderItem {
  
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  // NOVO CAMPO PARA URL DA IMAGEM
   imageUrl?: string;
  
}

export interface Order {
  id: number;
  userId: number | null;
  userEmail: string;
  total: number;
  status: 'PENDING' | 'PAID';
  createdAt: string;
  items: OrderItem[];
}

/**
 * Representa a requisição de pedido enviada ao backend
 * Espelha os DTOs CheckoutRequest e CheckoutItemRequest do Spring Boot
 */
export interface OrderItemRequest {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface OrderRequest {
  items: OrderItemRequest[];
}