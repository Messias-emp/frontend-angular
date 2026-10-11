import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  /**
   * Produto recebido do componente Home
   */
  @Input()
  product!: Product;

  /**
   * Evento enviado para a Home quando clicar em Comprar
   */
  @Output()
  buy = new EventEmitter<Product>();

  comprar() {
    this.buy.emit(this.product);
  }
}