import { Component, OnInit } from '@angular/core';
import { LoginServices } from './login.service';
import { usersModel } from '../models/users.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,
              private loginServices: LoginServices ) { }
  user: usersModel = {
    userName: '',
    userCode: '',
  };

  ngOnInit(): void {}

  loginUsuario(): void {
    this.loginServices.loginUser(this.user).subscribe((res: any) => {
      this.user = res.data;
      localStorage.setItem('sesion', 'active');
      this.router.navigateByUrl('/admin');
    })
    }

  

}
