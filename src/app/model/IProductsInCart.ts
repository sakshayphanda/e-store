import { IProductDetails } from './IProductDetails';

export interface IProductsInCart {
  totalCost: number;
  length: number;
  productDetails: {key: string, value: IProductDetails}[];
}
