import { Product } from "./Product";

export interface Cart {
  fullname?: string;
  address?: string;
  creditCard?: number;
  productList?: Product[];
  totalBillAmount?: number;
  isCheckout: boolean;
};
