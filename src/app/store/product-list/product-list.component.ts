import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,

  ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

 constructor(
  private service: ProductService,
  private cartService: CartService,
  private router: Router
) {}

  ngOnInit(): void {
    // 🔄 Carrega produtos para a vitrine
    this.service.findAll().subscribe(data => {
      this.products = data;
    });
  }


goToDetails(id: number) {
  this.router.navigate(['/products', id]);
}
addToCart(product: Product) {

  const cartItem: CartItem = {
    productId: product.id!,
    name: product.name,
    price: product.price,
    quantity: 1
  };

  this.cartService.addItem(cartItem);

  console.log('Produto adicionado ao carrinho:', cartItem);
}
}
