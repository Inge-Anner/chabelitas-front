import { Component, OnInit } from '@angular/core';
import { TrackingServices } from './tracking.service';
import { ordersModel } from '../models/orders.model';
import { OrderServices } from '../orders/orders.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  constructor(private OrderServices: OrderServices) {}
  orders: ordersModel = {
    statusOrderId: 0,
    phoneOrder: '',
    ticketOrder: '',
    nameOrder: '',
    lastNameOrder: '',
    adressDeliver: '',
    dateConfirmed: '',
    dateDeliver: '',
    totalOrder: 0,
  };

  estados: string[] = [
    'Creado',
    'Pago Enviado',
    'Pago Confirmado',
    'Pedido Enviado',
    'Eliminado',
  ];
  orderId: Number = 0;
  aux1: string = '';
  aux2: string = '';
  aux3: string = '';
  aux4: string = '';

  ngOnInit(): void {}

  ObtenerTracking(): void {
    this.OrderServices.buscarOrderById(this.orderId).subscribe((res: any) => {
      this.orders = res.data;
      console.log(res);
      localStorage.setItem('order', JSON.stringify(res));
      const getOrder = JSON.parse(localStorage.getItem('order')!);
      console.log('LA ORDEN CREADA ES:');
      console.log(getOrder);
      this.aux1 = '';
      this.aux2 = '';
      this.aux3 = '';
      this.aux4 = '';
      switch (getOrder.data.statusOrderId) {
        case 1:
          this.aux1 = 'active';
          break;
        case 2:
          this.aux1 = 'active';
          this.aux2 = 'active';
          break;
        case 3:
          this.aux1 = 'active';
          this.aux2 = 'active';
          this.aux3 = 'active';
          break;
        case 4:
          this.aux1 = 'active';
          this.aux2 = 'active';
          this.aux3 = 'active';
          this.aux4 = 'active';
          break;
        default:
          this.aux1 = '';
          this.aux2 = '';
          this.aux3 = '';
          this.aux4 = '';
          break;
      }
    });
  }
}
