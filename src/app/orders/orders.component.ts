import { Component, OnInit } from '@angular/core';
import { OrderServices } from './orders.service'
import { ordersModel } from '../models/orders.model'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private orderServices: OrderServices) { }
  orders: ordersModel[] = [];
  newOrder: ordersModel = {
    statusOrderId: 0,
    phoneOrder: '',
    ticketOrder: '',
    nameOrder: '',
    lastNameOrder: '',
    adressDeliver: '',
    dateConfirmed: '',
    dateDeliver: '',
    totalOrder: 0,
  }
  mostrar: boolean = false;
  mostrar2: string = '';

  ngOnInit(): void {
    this.obtenerCarrito();
    this.sumarTotal();
  }

  ObtenerOrder(): void {
    this.orderServices.cargarOrders().subscribe((res: any) => {
      this.orders = res.data;
      this.mostrar = true;
    });
  }

  CrearOrder(): void {
    this.orderServices.ingresarOrders(this.newOrder).subscribe((res: any) => {
      this.ObtenerOrder();
      // Inserta en Local Storage
      localStorage.setItem('order', JSON.stringify(res));
      // Obtiene del local Storage
      const getOrder = JSON.parse(localStorage.getItem('order')!);
      console.log('LA ORDEN CREADA ES:');
      console.log(getOrder);
      // Borra un objeto del local Storage
      localStorage.removeItem('order');
      // Limpia todo el local Storage
      localStorage.clear();
    });
  }

  carrito: any[] = [];
  cantidad: number = 1;
  total: number = 0;
  obtenerCarrito(): void {
    if (localStorage.getItem('carrito') != null) {
      let getCarrito = JSON.parse(localStorage.getItem('carrito')!);
      for (let i of getCarrito) {
        this.carrito.push(i);
      }
    }
  }
  mas(num: number): void{
    this.cantidad = num;
    this.cantidad = num + 1;
  }
  menos(num: number): void{
    this.cantidad = num;
    const min: number = 1;
    if(this.cantidad > min){
      this.cantidad = this.cantidad - 1;
    }
  }
  sumarTotal(): void {
    for(let item of this.carrito){
      this.total = this.total + item.orderDetailSubtotal;
    }
  }
}