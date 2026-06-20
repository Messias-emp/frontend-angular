import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  product!: Product;

  ngOnInit(): void {
    /**
     * 📦 Produto resolvido via Resolver
     * Nenhuma chamada HTTP aqui
     */
    this.product = this.route.snapshot.data['product'];
  }

  /**
   * 🛒 Adiciona produto ao carrinho
   * Aqui ocorre a conversão Product → CartItem
   */
addToCart(): void {

  if (!this.product?.id) {
    console.warn('Produto inválido para carrinho');
    return;
  }

  this.cartService.addItem({
    productId: this.product.id,
    name: this.product.name,
    price: this.product.price,
    quantity: 1,
    imageUrl: this.product.imageUrl
  });

  console.log('Produto adicionado ao carrinho', this.product);
}
}
