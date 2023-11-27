import { Component, OnInit } from '@angular/core';
import { faCartShopping, faArrowRightToBracket, faListUl, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  faCartShopping: IconDefinition = faCartShopping;
  faArrowRightToBracket: IconDefinition = faArrowRightToBracket;
  faListUl: IconDefinition = faListUl;
  cart: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
}
