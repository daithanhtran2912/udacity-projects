import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() productList: Product[] = [];
  @Output() cart = new EventEmitter();

  addToCart(product: Product, quantityStr: string): void {
    const quantity = Number.parseInt(quantityStr);
    if (isNaN(quantity)) {
      return;
    }
    product.quantity = quantity;
    this.cart.emit(product);
  }
}
