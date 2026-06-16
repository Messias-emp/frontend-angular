import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';




@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule,  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule],
  template: `
    <!-- product-form.component.html -->
<mat-card class="max-w-xl mx-auto mt-8 p-6">

  <mat-card-title>
    {{ isEdit ? 'Editar Produto' : 'Novo Produto' }}
  </mat-card-title>

  <mat-card-content>

    <mat-form-field class="w-full">
      <mat-label>Nome</mat-label>
      <input matInput [(ngModel)]="product.name" name="name" required />
    </mat-form-field>

<mat-form-field class="w-full">
  <mat-label>Descrição</mat-label>
  <textarea matInput
            [(ngModel)]="product.description"
            name="description">
  </textarea>
</mat-form-field>

<mat-form-field class="w-full">
  <mat-label>Detalhes</mat-label>
  <textarea matInput
            [(ngModel)]="product.details"
            name="details">
  </textarea>
</mat-form-field>

  <mat-card-content>
    <mat-form-field class="w-full">
      <mat-label>Preço</mat-label>
      <input matInput type="number" [(ngModel)]="product.price" name="price"  required/>
    </mat-form-field>

    <mat-form-field class="w-full">
  <mat-label>Estoque</mat-label>
  <input matInput
         type="number"
         [(ngModel)]="product.stock"
         name="stock" required>
</mat-form-field>

<mat-form-field class="w-full">
  <mat-label>URL da Imagem</mat-label>
  <input matInput
         [(ngModel)]="product.imageUrl"
         name="imageUrl"
         placeholder="https://site.com/imagem.jpg">
</mat-form-field>

    <mat-checkbox [(ngModel)]="product.active" name="active">
      Produto ativo
    </mat-checkbox>

  </mat-card-content>

  <mat-card-actions class="flex justify-end gap-2 mt-4">
    <button mat-button (click)="cancel()">Cancelar</button>

    <button
      mat-raised-button
      color="primary"
      (click)="save()">
      Salvar
    </button>
  </mat-card-actions>

  `
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    details: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    active: true
  };

  isEdit = false;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.service.findById(+id).subscribe(p => this.product = p);
    }
  }

  save(): void {
    if (this.isEdit && this.product.id) {
      this.service.update(this.product.id, this.product)
        .subscribe(() => this.router.navigate(['/admin/products']));
    } else {
      this.service.create(this.product)
        .subscribe(() => this.router.navigate(['/admin/products']));
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
  }
}
