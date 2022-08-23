import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductServices {

  constructor( private http: HttpClient ) { }

  cargarProductos(){
    const url = `${ base_url }/product`;
    return this.http.get( url )
  }
}
