import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { seasonsModel } from '../models/seasons.model'

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SeasonsServices {

  constructor( private http: HttpClient ) { }

  private manejarError(e: any) {
    console.log(e);
    console.log(e.error.message);
    return throwError('Ha ocurrido un error');
  }

  cargarSeason(){
    return this.http.get<any>(`${ base_url }/seasons`).pipe(catchError((e) => this.manejarError(e)));
  }

  ingresarSeason(data: seasonsModel){
    return this.http.post<any>(`${ base_url }/seasons`, data).pipe(catchError((e) => this.manejarError(e)));
  }

}
