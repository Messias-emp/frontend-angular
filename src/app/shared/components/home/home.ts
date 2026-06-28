import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeBanner } from '../home-banner/home-banner';
import { Product } from '../../models/product.model';
import { CartService } from './../../../core/services/cart.service';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeBanner,  ProductCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  addToCart(product: Product) {

    if (!product.id) return;  // só bloqueia se NÃO tiver id

    this.cartService.addItem({
      productId: product.id!,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });
    console.log('Produto adicionado 🛒', product); // simples (depois melhoramos)
  }
  ngOnInit(): void {
    this.products = this.route.snapshot.data['products'];
  }

}
