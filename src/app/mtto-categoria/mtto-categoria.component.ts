import { Component, OnInit } from '@angular/core';
import { CategoryServices } from './mtto-categoria.service';
import { categoryModel } from '../models/category.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-mtto-categoria',
  templateUrl: './mtto-categoria.component.html'
})
export class MttoCategoriaComponent implements OnInit {

  constructor(public router: Router, private CategoryServices: CategoryServices) { }

  category: categoryModel[] = [];
  newcategory: categoryModel = {
    statusId: 1,
    categoryName: '',
  }
  searchCategory: number = 0;
  mostrar: boolean = false;
  mostrar3: string = '';

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerCategory();
  }

  cierraSesion(): void {
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

  ObtenerCategoryById(): void {
    this.CategoryServices.buscarCategoryById(this.searchCategory).subscribe((res: any) => {
      this.newcategory = res.data
    });
  }

  UpdateCategoryById(): void {
    this.CategoryServices.actualizarCategory(this.searchCategory, this.newcategory).subscribe((res: any) => {
      this.ObtenerCategory();
    });
  }

  DeleteCategoryById(): void {
    this.CategoryServices.eliminarCategory(this.searchCategory).subscribe((res: any) => {
      this.ObtenerCategory();
    });
  }
  LimpiarBusqueda() {
    window.location.reload()
  }
}
