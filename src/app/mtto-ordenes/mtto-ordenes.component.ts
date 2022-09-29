import { Component, OnInit } from '@angular/core';
import { OrderServices } from './mtto-ordenes.service';
import { ordersModel } from '../models/orders.model';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { detailordersModel } from '../models/detailorders.model';
import { productsModel } from "../models/products.model";
import { ProductServices } from '../mtto-productos/mtto-productos.service';

@Component({
  selector: 'app-mtto-ordenes',
  templateUrl: './mtto-ordenes.component.html'
})
export class MttoOrdenesComponent implements OnInit {
  constructor(public router: Router, private orderServices: OrderServices, private productServices: ProductServices) { }
  orders: ordersModel[] = [];
  products: productsModel[] = [];
  newDetail: detailordersModel[] = [
    {
      productId: 0,
      orderId: 0,
      detailOrderQuantity: 0,
      orderDetailSubtotal: 0
    }
  ];
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
    dateDeliver: null,
    totalOrder: 0,
  };

  estado: string = '';
  mostrar: boolean = false;

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerOrder();
    this.ObtenerProductos();
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

  async consultaDetalle(id: number | undefined): Promise<void> {
    await this.orderServices.buscarDetalleById(id).subscribe((res: any) => {
      this.newDetail = res.data;
      this.newDetail.forEach((detalle, index1) => {
        this.products.forEach((producto, index2) => {
          if (producto.productId == detalle.productId) {
            console.log(this.products[index2].productName);
            this.newDetail[index1].productId = producto.productName;
          }
        });
      });
    });
  }

  validaSesion(): void {
    const getOrder = localStorage.getItem('sesion');
    if (!getOrder) {
      this.router.navigateByUrl('/login');
    }
  }

  ObtenerProductos(): void {
    this.productServices.cargarProductos().subscribe((res: any) => {
      this.products = res.data;
      this.mostrar = true;
    });
  }

  cierraSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigateByUrl('/login');
  }

  ObtenerOrder(): void {
    this.orderServices.cargarOrders().subscribe((res: any) => {
      this.orders = res.data.map((order: ordersModel) => {
        order.dateCreated = moment(order.dateCreated).tz('America/Guatemala').format('DD-MM-YYYY HH:mm:ss');
        order.dateConfirmed = order.dateConfirmed !== null ? moment(order.dateConfirmed).tz('America/Guatemala').format('DD-MM-YYYY HH:mm:ss') : '';
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


  cambioOrden2: any = {
    orderId: 0,
    statusOrderId: 0,
  }

  cambiarStatus(): void {
    this.cambioOrden2.orderId = this.currentOrder.orderId;
    switch (this.estado) {
      case 'Pago Enviado':
        this.cambioOrden2.statusOrderId = 2;
        break;
      case 'Pago Confirmado':
        this.cambioOrden2.statusOrderId = 3;
        break;
      case 'Pedido Enviado':
        this.cambioOrden2.statusOrderId = 4;
        break;
      case 'Eliminado':
        this.cambioOrden2.statusOrderId = 5;
        break;
      default:
        break;
    }
    this.orderServices.actualizarOrden(this.cambioOrden2.orderId, this.cambioOrden2).subscribe((res: any) => {
      this.orders = res.data;
      this.ObtenerOrder();
    });
  }

}