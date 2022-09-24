import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.prod';
import { categoryModel } from '../models/category.model'

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoryServices {

  constructor(private http: HttpClient) { }

  private manejarError(e: any) {
    console.log(e);
    console.log(e.error.message);
    return throwError('Ha ocurrido un error');
  }

  cargarCategory() {
    return this.http.get<any>(`${base_url}/categories/Admin`).pipe(catchError((e) => this.manejarError(e)));
  }

  ingresarCategory(data: categoryModel) {
    return this.http.post<any>(`${base_url}/category`, data).pipe(catchError((e) => this.manejarError(e)));
  }

  eliminarCategory(id: any) {
    return this.http.delete<any>(`${base_url}/category/${id}`).pipe(catchError((e) => this.manejarError(e)));
  }

  buscarCategoryById(id: any) {
    return this.http.get<any>(`${base_url}/category/${id}`).pipe(catchError((e) => this.manejarError(e)));
  }

  actualizarCategory(categoryId: number | undefined, data: categoryModel) {
    return this.http.put<any>(`${base_url}/category/${categoryId}`, data).pipe(catchError((e) => this.manejarError(e)));
  }

}
