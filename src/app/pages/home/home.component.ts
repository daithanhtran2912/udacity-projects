import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { SpinnerService } from '../../services/spinner.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productService: ProductService, private spinnerService: SpinnerService, private cartService: CartService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    // Simulate fetching data from api
    setTimeout(() => {
      this.productList = this.productService.getAllProducts();
      this.spinnerService.hide();
    }, 200);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert("Added to cart!");
  }
}
