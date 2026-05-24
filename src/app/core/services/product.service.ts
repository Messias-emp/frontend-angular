import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  // ✅ endpoint correto
  private readonly API = `${this.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  // 📋 LISTAR TODOS
  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  // 🔍 BUSCAR POR ID
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  // ➕ CRIAR
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API, product);
  }

  // ✏️ ATUALIZAR
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${id}`, product);
  }

  // 🗑️ DELETAR
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
