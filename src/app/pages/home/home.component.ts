import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];
  cart: Cart;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private spinnerService: SpinnerService) {
    this.cart = this.cartService.getCart();
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.productService.getAllProducts().subscribe(res => {
      this.productList = res;
      this.spinnerService.hide();
    });
  }
}
