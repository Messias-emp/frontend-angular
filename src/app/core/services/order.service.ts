import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OrderRequest } from '../../shared/models/order.model';
import { Order } from '../../shared/models/order.model';

/**
 * Serviço de pedidos — usa localhost:8080/api/orders.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {

  // URL do backend local
  private apiUrl = 'http://localhost:8080/api/orders';

  private orderCountSubject = new BehaviorSubject<number>(0);
  orderCount$ = this.orderCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Lista pedidos (autenticado). */
  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /** Header JWT centralizado. */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  /** Cria pedido (checkout). */
  createOrder(order: OrderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, order, {
      headers: this.getAuthHeaders()
    }).pipe(tap(() => this.incrementOrderCount()));
  }

  /** Pedidos do usuário logado. */
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`, {
      headers: this.getAuthHeaders()
    });
  }

  /** Pedido por ID. */
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  /** Contador real do backend. */
  loadOrderCount(): void {
    this.http.get<any[]>(`${this.apiUrl}/my-orders`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: orders => this.orderCountSubject.next(orders.length),
      error: () => this.orderCountSubject.next(0)
    });
  }

  private incrementOrderCount(): void {
    this.orderCountSubject.next(this.orderCountSubject.value + 1);
  }

  resetOrderCount(): void {
    this.orderCountSubject.next(0);
  }

  /** Alias para listar pedidos (autenticado). */
  findAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }
}
