import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { visualizationsModel } from '../models/visualizations.model';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductServices {

  constructor(private http: HttpClient) { }

  private manejarError(e: any) {
    console.log(e);
    console.log(e.error.message);
    return throwError('Ha ocurrido un error');
  }

  cargarCategory() {
    return this.http.get<any>(`${base_url}/category`).pipe(catchError((e) => this.manejarError(e)));
  }

  cargarProductos(where: any) {
    return this.http.get<any>(`${base_url}/product?categoryId=${where.categoryId}`).pipe(catchError((e) => this.manejarError(e)));
  }

  insertaVisualizacion(data: visualizationsModel) {
    return this.http.post<any>(`${base_url}/visualizations`, data).pipe(catchError((e) => this.manejarError(e)));
  }

}
