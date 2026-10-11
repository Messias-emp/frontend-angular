import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  // 🧠 Estado interno do carrinho (tipado!)
  private readonly _items = new BehaviorSubject<CartItem[]>([]);

  // 📡 Observable público (somente leitura)
  readonly items$ = this._items.asObservable();

  getCurrentItems(): CartItem[] {
  return this._items.value;
}
  /**
   * ➕ Adiciona item ao carrinho
   */
  addItem(item: CartItem): void {
    const items = this._items.value;
    const existing = items.find(i => i.productId === item.productId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push({ ...item });
    }

    this._items.next([...items]);
  }

  /**
   * ❌ Remove item do carrinho
   */
  removeItem(productId: number): void {
    const filtered = this._items.value.filter(
      item => item.productId !== productId
    );

    this._items.next(filtered);
  }

  /**
   * ➕ Aumenta a quantidade de um item
   */
  incrementItem(productId: number): void {
    const items = this._items.value;
    const item = items.find(i => i.productId === productId);
    if (item) {
      item.quantity += 1;
      this._items.next([...items]);
    }
  }

  /**
   * ➖ Diminui a quantidade de um item (remove quando chegar a 0)
   */
  decrementItem(productId: number): void {
    const items = this._items.value;
    const item = items.find(i => i.productId === productId);
    if (!item) return;

    if (item.quantity <= 1) {
      this.removeItem(productId);
    } else {
      item.quantity -= 1;
      this._items.next([...items]);
    }
  }

  /**
   * Atualiza a quantidade de um item
   */
  setQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const items = this._items.value;
    const item = items.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      this._items.next([...items]);
    }
  }

  /**
   * 🧹 Limpa o carrinho
   */
  clear(): void {
    this._items.next([]);
  }

  /**
   * 💰 Total do carrinho
   */
  getTotal(): number {
    return this._items.value.reduce(
      (total: number, item: CartItem) =>
        total + item.price * item.quantity,
      0
    );
  }

  /**
   * 🛒 Quantidade total de itens
   */
  getCount(): number {
    return this._items.value.reduce(
      (total: number, item: CartItem) =>
        total + item.quantity,
      0
    );
  }
  

}
