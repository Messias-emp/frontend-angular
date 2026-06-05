import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

  private http = inject(HttpClient);
  private api =
  'https://backend-e-comerce-ma4w.onrender.com/orders';

  checkout(payload: { userEmail: string; total: number }) {
    return this.http.post(`${this.api}/checkout`, payload);
  }
}
