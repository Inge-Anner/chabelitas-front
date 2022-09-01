import { Component, OnInit } from '@angular/core';
import { OrderServices } from './mtto-ordenes.service'
import { ordersModel } from '../models/orders.model'

@Component({
  selector: 'app-mtto-ordenes',
  templateUrl: './mtto-ordenes.component.html',
  styleUrls: ['./mtto-ordenes.component.scss']
})
export class MttoOrdenesComponent implements OnInit {

  constructor(private orderServices: OrderServices) { }
  orders: ordersModel[] = [];
  estado: any;
  mostrar: boolean = false;

  ngOnInit(): void {
    this.ObtenerOrder();
  }

  estados: string[] = ['Creado','Pago Enviado','Pago Confirmado','Pedido Enviado','Eliminado'];
  orderId: Number = 0;
  aux1: string = '';
  aux2: string = '';
  aux3: string = '';
  aux4: string = '';


  ObtenerOrder(): void {
    this.orderServices.cargarOrders().subscribe((res: any) => {
      this.orders = res.data;
      this.mostrar = true;
    });
  }

  indicarStatus(statusId: any): void {
    for(let status of this.estados){
      if (statusId == status+1){
        console.log(status);
        this.estado = this.estados;
      }
    }
    console.log(this.estado);
  }

}
  