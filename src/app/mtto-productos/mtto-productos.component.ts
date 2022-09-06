import { Component, OnInit } from '@angular/core';
import { ProductServices } from './mtto-productos.service'
import { productsModel } from '../models/products.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-mtto-productos',
  templateUrl: './mtto-productos.component.html',
  styleUrls: ['./mtto-productos.component.scss']
})
export class MttoProductosComponent implements OnInit {

  constructor(private router: Router, private productServices: ProductServices) { }
  products: productsModel[] = [];
  newProduct: productsModel = {
    categoryId: 0,
    productDescription: "",
    productImage: "",
    productName: "",
    productPrice: 0,
    seasonId: 0,
    statusId: 0,
  }
  mostrar: boolean = false;

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerProductos();
  }
  
  cierraSesion(): void{
    localStorage.removeItem('sesion');
    this.router.navigateByUrl('/login');
  }

  validaSesion(): void {
    const getProducts = localStorage.getItem('sesion');
    if (!getProducts) {
      this.router.navigateByUrl('/login');
    }
  }

  ObtenerProductos(): void {
    this.productServices.cargarProductos().subscribe((res: any) => {
      this.products = res.data;
      this.mostrar = true;
    });
  }

  CrearProducto(): void {
    this.productServices.ingresarProducto(this.newProduct).subscribe((res: any) => {
      this.ObtenerProductos();
    });
  }

}
