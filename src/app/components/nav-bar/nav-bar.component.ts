import { Component, Input, OnInit } from '@angular/core';
import { faCartShopping, faArrowRightToBracket, faListUl } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  faCartShopping = faCartShopping;
  faArrowRightToBracket = faArrowRightToBracket;
  faListUl = faListUl;
  @Input() cart: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
}
