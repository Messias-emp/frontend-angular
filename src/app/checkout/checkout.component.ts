import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable, take } from 'rxjs';

import { CartService } from '../core/services/cart.service'; // ✅ SERVICE
import { CartItem } from '../core/models/cart-item.model';  // ✅ MODEL
import { OrderService } from '../core/services/order.service';
import { Router, RouterLink} from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {

  // 📡 Itens do carrinho (stream reativo)
  items$: Observable<CartItem[]>;

  loading = false;
  errorMessage: string | null = null;

  constructor(
    public cartService: CartService,   // ✅ AGORA SIM
    private orderService: OrderService,
    public router: Router
  ) {
    this.items$ = this.cartService.items$;
  }

  /**
   * ❌ Remove item do carrinho
   */
  remove(productId: number): void {
    this.cartService.removeItem(productId);
  }

  /**
   * 💰 Total do pedido
   */
  getTotal(): number {
    return this.cartService.getTotal();
  }

  /**
   * ✅ Finaliza pedido
   */
checkout(): void {

  this.loading = true;
  this.errorMessage = null;

  this.items$.pipe(take(1)).subscribe(items => {

    if (!items || items.length === 0) {
      this.errorMessage = 'Carrinho vazio';
      this.loading = false;
      return;
    }
console.log('Itens do carrinho:', items);
const orderRequest = {
  items: items.map(item => ({
    productId: item.productId,
    productName: item.name,
    quantity: item.quantity,
    price: item.price,
    imageUrl: item.imageUrl
  }))
};

    this.orderService.createOrder(orderRequest).subscribe({
      next: () => {
        this.cartService.clear();
        this.loading = false;
        this.router.navigate(['/meus-pedidos']);

      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erro ao finalizar pedido';
      }
    });

console.log('Pedido enviado:', orderRequest);
  });
}

  
}
