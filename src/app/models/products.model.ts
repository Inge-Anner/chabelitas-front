export interface productsModel {
  categoryId: number | string | undefined;
  productDescription?: string;
  productId?: number;
  productImage?: string;
  productName?: string;
  productPrice: number;
  seasonId: number | undefined | string;
  statusId: number | string;
}
