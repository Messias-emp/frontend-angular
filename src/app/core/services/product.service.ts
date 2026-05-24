import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL base do backend
  private apiUrl = environment.apiUrl;

  // Endpoint correto da API
  private readonly API = `${this.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  // 📋 Listar produtos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  // 🔍 Buscar por ID
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  // ➕ Criar produto
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API, product);
  }

  // ✏️ Atualizar produto
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${id}`, product);
  }

  // 🗑️ Deletar produto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}