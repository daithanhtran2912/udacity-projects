import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart!: Cart;

  constructor() {
    this.cart = {
      username: 'user',
      productList: <Product[]>[],
      totalBillAmount: 0
    }
  }

  getCart(): Cart {
    return this.cart;
  }

  addToCart(product: Product): void {
    if (!this.cart.productList?.find(p => p.id === product.id)) {
      product.quantity = 1;
      this.cart.productList?.push(product);
    } else {
      let found = this.cart.productList.find(p => p.id === product.id);
      if (found) {
        (found.quantity as number)++;
      }
    }
    this.calculateTotalBillAmount();
  }

  private calculateTotalBillAmount(): void {
    let totalBillAmount = 0;
    this.cart.productList!.forEach(product => {
      totalBillAmount += product.price * (product.quantity === undefined ? 1 : product.quantity);
    });
    this.cart.totalBillAmount = Number(totalBillAmount.toFixed(2));
  }
}
