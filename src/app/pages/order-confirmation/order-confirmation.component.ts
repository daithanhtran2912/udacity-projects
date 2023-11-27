import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent implements OnInit {
  cart: Cart;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cartService.emptyCart();
  }
}
