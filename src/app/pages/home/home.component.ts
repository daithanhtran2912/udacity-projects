import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productService: ProductService, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    // Simulate fetching data from api
    setTimeout(() => {
      this.productList = this.productService.getAllProducts();
      this.spinnerService.hide();
    }, 200);
  }
}
