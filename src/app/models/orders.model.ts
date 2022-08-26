export interface ordersModel {
    orderId: number;
    statusOrderId: number;
    phoneOrder: string;
    ticketOrder?: string;
    nameOrder?: string;
    lastNameOrder?: string;
    adressDeliver?: string;
    dateCreated: any;
    dateConfirmed?: any;
    dateDeliver?: any;
    totalOrder: number;
  }
  