import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ordersModel } from '../models/orders.model';
import { detailordersModel } from '../models/detailorders.model';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OrderServices {

  constructor( private http: HttpClient ) { }

  private manejarError(e: any) {
    console.log(e);
    console.log(e.error.message);
    return throwError('Ha ocurrido un error');
  }

  

  cargarOrders(){
    return this.http.get<any>(`${ base_url }/orders`).pipe(catchError((e) => this.manejarError(e)));
  }

  ingresarOrders(data: ordersModel){
    return this.http.post<any>(`${ base_url }/order`, data).pipe(catchError((e) => this.manejarError(e)));
  }
  insertarDetailOrders(data: detailordersModel){
    return this.http.post<any>(`${ base_url }/detailorder`, data).pipe(catchError((e) => this.manejarError(e)));
  }

  buscarOrderById(order: any){
    return this.http.get<any>(`${ base_url }/order/${order}`).pipe(catchError((e) => this.manejarError(e)));
  }

}