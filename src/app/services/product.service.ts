import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = '../assets/data.json';
  private products: Product[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Product[]>(this.url).subscribe(res => {
      this.products = res;
    });
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  findProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
