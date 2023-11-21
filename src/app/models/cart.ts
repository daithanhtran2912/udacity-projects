import { Product } from "./Product";

export interface Cart {
  username: string;
  productList?: Product[];
  totalBillAmount?: number;
};
