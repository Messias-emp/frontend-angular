import { Product } from '../../shared/models/product.model';


/**
 * Item do carrinho
 * Relaciona produto + quantidade
 */
export interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}
  


