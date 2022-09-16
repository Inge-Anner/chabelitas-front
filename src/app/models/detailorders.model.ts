export interface detailordersModel {
  detailOrderId?: number;
  productId: number | undefined | string;
  orderId: number;
  detailOrderQuantity: number;
  orderDetailSubtotal: number;
}
