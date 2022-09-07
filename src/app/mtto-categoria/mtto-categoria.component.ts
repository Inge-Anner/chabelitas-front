import { Component, OnInit } from '@angular/core';
import { CategoryServices } from './mtto-categoria.service';
import { categoryModel } from '../models/category.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-mtto-categoria',
  templateUrl: './mtto-categoria.component.html',
  styleUrls: ['./mtto-categoria.component.scss']
})
export class MttoCategoriaComponent implements OnInit {

  constructor(public router: Router, private CategoryServices: CategoryServices) { }

  category: categoryModel[] = [];
  newcategory: categoryModel = {
    categoryId: 0,
    statusId: 0,
    categoryName: '',
  }
  mostrar: boolean = false;
  mostrar3: string = '';

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerCategory();
  }

  cierraSesion(): void{
    localStorage.removeItem('sesion');
    this.router.navigateByUrl('/login');
  }

  validaSesion(): void {
    const getCategory = localStorage.getItem('sesion');
    if (!getCategory) {
      this.router.navigateByUrl('/login');
    }
  }
  ObtenerCategory(): void {
    this.CategoryServices.cargarCategory().subscribe((res: any) => {
      this.category = res.data;
      this.mostrar = true;
    });
  }

  CrearCategory(): void {
    this.CategoryServices.ingresarCategory(this.newcategory).subscribe((res: any) => {
      this.ObtenerCategory();
    });
  }
}
