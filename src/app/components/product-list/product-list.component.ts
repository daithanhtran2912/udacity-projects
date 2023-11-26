import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() productList: Product[] = [];

  constructor(private cartService: CartService) { }

  addToCart(product: Product, quantityStr: string): void {
    const quantity = Number.parseInt(quantityStr);
    if (isNaN(quantity)) {
      return;
    }
    product.quantity = quantity;
    this.cartService.addToCart(product);
    // alert("Added to cart!");
  }
}
