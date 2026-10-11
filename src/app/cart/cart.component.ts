import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../core/services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../core/models/cart-item.model';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  // 📡 Stream reativo do carrinho
  items$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.items$;
  }

  /**
   * ➕ Aumenta a quantidade
   */
  increment(item: CartItem): void {
    this.cartService.incrementItem(item.productId);
  }

  /**
   * ➖ Diminui a quantidade
   */
  decrement(item: CartItem): void {
    this.cartService.decrementItem(item.productId);
  }

  /**
   * ❌ Remove item do carrinho
   */
  remove(productId: number): void {
    this.cartService.removeItem(productId);
  }

  /**
   * 💰 Total do carrinho
   */
  getTotal(): number {
    return this.cartService.getTotal();
  }

  /**
   * 🛒 Quantidade total de itens
   */
  getCount(): number {
    return this.cartService.getCount();
  }

  /**
   * 🧹 Limpa o carrinho
   */
  clear() {
    this.cartService.clear();
  }

  /**
   * 💵 Preço formatado
   */
  formatPrice(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * 🔁 trackBy para *ngFor do carrinho
   */
  trackByProductId(_: number, item: CartItem): number {
    return item.productId;
  }
}