import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { IconDefinition, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private productId: number;
  @Input() product: Product;
  faArrowLeft: IconDefinition = faArrowLeft;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = Number.parseInt(params['id']);
    });

    const product = this.productService.findProductById(this.productId);
    if (product !== undefined) {
      this.product = product
    } else {
      alert("Unable to load product info!");
    }
  }

  addToCart(product: Product, quantityStr: string): void {
    const quantity = Number.parseInt(quantityStr);
    if (isNaN(quantity)) {
      return;
    }
    product.quantity = quantity;
    this.cartService.addToCart(product);
    alert('Added to cart!');
  }
}
