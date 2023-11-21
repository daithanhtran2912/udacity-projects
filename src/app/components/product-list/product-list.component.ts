import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() productList: Product[] = [];
  @Input() cart!: Cart;

  constructor(private cartService: CartService) {
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
