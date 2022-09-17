import { Component, OnInit } from '@angular/core';
import { TrackingServices } from './tracking.service';
import { ordersModel } from '../models/orders.model';
import { OrderServices } from '../orders/orders.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  constructor(private OrderServices: OrderServices,private TrackingServices: TrackingServices ) {}


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
  orderId: number = 0;
  aux1: string = '';
  aux2: string = '';
  aux3: string = '';
  aux4: string = '';
  mostrar: boolean = false;
  mostrar2: boolean = false;
  phoneOrder :string = '';

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
      this.mostrar = true;
    });
  }

  UpdateOrderById(): void {
    if (this.orders.statusOrderId ==1) {
      this.orders.statusOrderId = 2;
      const fecha = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
    this.orders.dateConfirmed = fecha;
    
    }
      this.TrackingServices.actualizarOrden(this.orderId, this.orders).subscribe((res: any) => {
        this.ObtenerOrder();
      }); 

  }

  ObtenerOrder(): void {
    this.TrackingServices.cargarTracking().subscribe((res: any) => {
      this.orders = res.data;
      this.mostrar = true;
    });
  }

  ValidarUsuario():void {
   if (this.phoneOrder == this.orders.phoneOrder) {
    this.mostrar2 = true;
   } 
  }
}
  