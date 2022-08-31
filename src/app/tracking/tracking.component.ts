import { Component, OnInit } from '@angular/core';
import { TrackingServices } from './tracking.service';
import { ordersModel } from '../models/orders.model'

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent implements OnInit {

  constructor( private TrackingServices: TrackingServices ) { }
  orders: ordersModel[] = [];
  
  mostrar: boolean = false;

  ngOnInit(): void {
  }
  

  ObtenerTracking(): void {
    this.TrackingServices.cargarTracking().subscribe((res: any) => {
      this.orders = res.data;
      this.mostrar = true;
    });
  }

}
