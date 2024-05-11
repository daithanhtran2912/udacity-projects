import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;

  constructor() {
    // Init an empty cart
    this.cart = {
      productList: <Product[]>[],
      totalBillAmount: 0,
      isCheckout: false,
      fullname: undefined,
      address: undefined,
      creditCard: undefined
    }
  }

  getCart(): Cart {
    return this.cart;
  }

  emptyCart(): void {
    this.cart.productList?.splice(0, this.cart.productList.length);
    this.cart = { ...this.cart,
      totalBillAmount: 0,
      isCheckout: false,
      fullname: undefined,
      address: undefined,
      creditCard: undefined
    }
  }

  updateCartInfo(fullname: string, address: string, creditCard: number): Cart {
    return this.cart = {
      ...this.cart,
      fullname: fullname,
      address: address,
      creditCard: creditCard,
      isCheckout: true
    }
  }

  addToCart(product: Product): void {
    if (!this.cart.productList?.find(p => p.id === product.id)) {
      this.cart.productList?.push(JSON.parse(JSON.stringify(product)));
    } else {
      const found = this.cart.productList.find((p) => p.id === product.id);
      if (found) {
        found.quantity = Number(found.quantity) + Number(product.quantity);
      }
    }
    this.calculateTotalBillAmount();
  }

  updateProductQuantity(id: number, quantity: number): void {
    const found = this.cart.productList!.find((p) => p.id === id);
    if (found) {
      found.quantity = quantity;
      this.calculateTotalBillAmount();
    }
  }

  private calculateTotalBillAmount(): void {
    let totalBillAmount = 0;
    this.cart.productList!.forEach((product) => {
      totalBillAmount += product.price * (product.quantity === undefined ? 1 : product.quantity);
    });
    this.cart.totalBillAmount = Number(totalBillAmount.toFixed(2));
  }

  removeFromCart(id: number): void {
    const index = this.cart.productList?.findIndex((p) => p.id === id);
    this.cart.productList?.splice((index as number), 1);
    this.calculateTotalBillAmount();
  }
}
