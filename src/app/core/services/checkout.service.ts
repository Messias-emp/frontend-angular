import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/orders';

  checkout(items: { productId: number; productName: string; quantity: number; price: number; imageUrl?: string }[]) {
    return this.http.post(`${this.api}/checkout`, { items }, { headers: { 'Content-Type': 'application/json' } });
  }
}
