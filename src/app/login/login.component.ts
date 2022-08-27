import { Component, OnInit } from '@angular/core';
import { LoginServices } from './login.service';
import { usersModel } from '../models/users.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private loginServices: LoginServices ) { }
  users: usersModel[] = [];

  ngOnInit(): void {
  }
  
  login(form:NgForm){
    const email = form.value.userEmail;
    const password = form.value.userPass;
  }


  obtenerUsuarios(): void {
    this.loginServices.getUsuarios().subscribe((res: any) => {
      this.users = res.data;
    })
  }
//
}
