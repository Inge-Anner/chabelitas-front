import { Component, OnInit } from '@angular/core';
import { OrderServices } from './mtto-ordenes.service';
import { ordersModel } from '../models/orders.model';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-mtto-ordenes',
  templateUrl: './mtto-ordenes.component.html',
  styleUrls: ['./mtto-ordenes.component.scss'],
})
export class MttoOrdenesComponent implements OnInit {
  constructor(private router: Router,
              private orderServices: OrderServices) {}
  orders: ordersModel[] = [];
  currentOrder: ordersModel = {
    orderId: 0,
    statusOrderId: 0,
    phoneOrder: '',
    ticketOrder: '',
    nameOrder: '',
    lastNameOrder: '',
    adressDeliver: '',
    dateCreated: '',
    dateConfirmed: '',
    totalOrder: 0,
  };
  estado: string = '';
  mostrar: boolean = false;

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerOrder();
  }

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

  validaSesion(): void {
    const getOrder = localStorage.getItem('sesion');
    if (!getOrder) {
      this.router.navigateByUrl('/login');
    }
  }

  cierraSesion(): void{
    localStorage.removeItem('sesion');
    this.router.navigateByUrl('/login');
  }

  ObtenerOrder(): void {
    this.orderServices.cargarOrders().subscribe((res: any) => {
      this.orders = res.data.map((order: ordersModel) => {
        order.dateCreated = moment(order.dateCreated).tz('America/Guatemala').format('DD-MM-YYYY HH:mm:ss');
        order.dateConfirmed = moment(order.dateConfirmed).tz('America/Guatemala').format('DD-MM-YYYY HH:mm:ss');
        order.dateDeliver = order.dateDeliver !== null ? moment(order.dateDeliver).tz('America/Guatemala').format('DD-MM-YYYY HH:mm:ss') : '';
        switch (order.statusOrderId) {
          case 1:
            order.statusOrderId = 'Creada';
            break;
          case 2:
            order.statusOrderId = 'Pago Enviado';
            break;
          case 3:
            order.statusOrderId = 'Pago Confirmado';
            break;
          case 4:
            order.statusOrderId = 'Pedido Enviado';
            break;
          case 5:
            order.statusOrderId = 'Eliminado';
            break;
          default:
            order.statusOrderId = '';
            break;
        }
        return order;
      });
      this.mostrar = true;
    });
  }

  llenarOrden(order: ordersModel): void {
    this.currentOrder = order;
  }

  cambiarStatus(): void {
    switch (this.estado) {
      case 'Pago Enviado':
        this.currentOrder.statusOrderId = 2;
        break;
      case 'Pago Confirmado':
        this.currentOrder.statusOrderId = 3;
        break;
      case 'Pedido Enviado':
        this.currentOrder.statusOrderId = 4;
        break;
      case 'Eliminado':
        this.currentOrder.statusOrderId = 5;
        break;
      default:
        break;
    }
    this.orderServices
      .actualizarOrden(this.currentOrder?.orderId, this.currentOrder)
      .subscribe((res: any) => {
        this.orders = res.data;
        this.mostrar = true;
        this.ObtenerOrder();
      });
  }
}
