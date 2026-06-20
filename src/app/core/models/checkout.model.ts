export interface CheckoutItemRequest {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
    // NOVO CAMPO PARA URL DA IMAGEM
    imageUrl?: string;
}

export interface CheckoutRequest {
  userId: number;
  userEmail: string;
  items: CheckoutItemRequest[];
}
