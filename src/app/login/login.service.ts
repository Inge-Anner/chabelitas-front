import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
// import { usersModel } from '../models/users.model';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  constructor( private http: HttpClient ) { }

  private manejarError(e: any) {
    console.log(e);
    console.log(e.error.message);
    return throwError('Ha ocurrido un error');
  }

  getUsuarios(){
    return this.http.get<any>(`${ base_url }/user`).pipe(catchError((e) => this.manejarError(e)));
  }

}
