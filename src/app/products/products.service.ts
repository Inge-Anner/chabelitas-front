import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { productsModel } from '../models/products.model'

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductServices {

  constructor( private http: HttpClient ) { }

  private manejarError(e: any) {
    console.log(e);
    console.log(e.error.message);
    return throwError('Ha ocurrido un error');
  }

  cargarProductos(){
    return this.http.get<any>(`${ base_url }/product`).pipe(catchError((e) => this.manejarError(e)));
  }

  ingresarProducto(data: productsModel){
    return this.http.post<any>(`${ base_url }/product`, data).pipe(catchError((e) => this.manejarError(e)));
  }

}