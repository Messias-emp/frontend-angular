import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OrderRequest } from './order.model';
import { Order } from '../../shared/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {

 private apiUrl =
  'https://backend-e-comerce-ma4w.onrender.com/orders';

  /* =============================
     🔔 ESTADO REATIVO
     ============================= */
  private orderCountSubject = new BehaviorSubject<number>(0);
  orderCount$ = this.orderCountSubject.asObservable();

  constructor(private http: HttpClient) {}

    findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  /* =============================
     🔐 HEADER JWT CENTRALIZADO
     ============================= */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  /* =============================
     🚀 CRIAR PEDIDO
     ============================= */
  createOrder(order: OrderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, order, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => this.incrementOrderCount())
    );
  }

  /* =============================
     📦 PEDIDOS DO USUÁRIO
     ============================= */
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`, {
      headers: this.getAuthHeaders()
    });
  }

  /* =============================
     🔎 PEDIDO POR ID
     ============================= */
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
      
    });
  }

  /* =============================
     📊 CONTADOR REAL DO BACKEND
     ============================= */
  loadOrderCount(): void {
    this.http.get<any[]>(`${this.apiUrl}/my-orders`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: orders => this.orderCountSubject.next(orders.length),
      error: () => this.orderCountSubject.next(0)
    });
  }

  /* =============================
     🔼 / 🔽 CONTROLE LOCAL
     ============================= */
  private incrementOrderCount(): void {
    this.orderCountSubject.next(this.orderCountSubject.value + 1);
  }

  resetOrderCount(): void {
    this.orderCountSubject.next(0);
  }
  findAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, {
      
    });
  }
}