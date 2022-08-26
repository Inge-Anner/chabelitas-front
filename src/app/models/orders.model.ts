export interface ordersModel {
    orderId: number;
    statusOrderId?: number;
    phoneOrder: string;
    ticketOrder: string;
    nameOrder: string;
    lastNameOrder: string;
    dateCreated: Date;
    dateConfirmed: Date;
    dateDeliver: Date;
    adressDeliver: string;
    totalOrder: number;
  }
  