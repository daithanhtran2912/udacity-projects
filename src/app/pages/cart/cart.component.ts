import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart;
  fullname: string;
  address: string;
  creditCard: number;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  updateProductQuantity(product: Product, quantityStr: string): void {
    let quantity = Number.parseInt(quantityStr);
    const currentQuantity = Number(product.quantity);
    const additional = quantity - currentQuantity;
    quantity = currentQuantity + additional;
    const productId = Number(product.id);

    if (isNaN(quantity) || quantity <= 0) {
      this.cartService.removeFromCart(productId);
      alert('Removed from cart!');
    } else {
      this.cartService.updateProductQuantity(productId, quantity);
    }
  }

  checkout(): void {
    this.cart = this.cartService.updateCartInfo(this.fullname, this.address, this.creditCard);
    this.router.navigate(['/order-confirmation']);
  }
}
