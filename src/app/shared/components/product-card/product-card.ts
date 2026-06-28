import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
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