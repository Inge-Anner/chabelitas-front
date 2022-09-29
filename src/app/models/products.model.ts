export interface productsModel {
  categoryId: number | string | undefined;
  productDescription?: string;
  productId?: number;
  productImage?: string;
  productName?: string;
  productPrice: number;
  seasonId: number | undefined | string;
  statusId: number | string;
  portionsMin?: number;
  toppingsYes?: number | undefined | string | null;
  categoryTopping?: number | undefined | string | null;
  id_categoria?: number | string | undefined;
  id_temporada?: number | undefined | string;
}
