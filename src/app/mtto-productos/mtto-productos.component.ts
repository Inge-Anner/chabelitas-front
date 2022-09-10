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

  constructor(public router: Router, private productServices: ProductServices) { }
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
  idProd: any;
  searchProduct: number = 0;

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerProductos();
  }

  darValor(id: any): void{
    this.idProd = +id;
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

  EliminarProducto(): void{
    this.productServices.eliminarProducto(this.searchProduct).subscribe((res: any) => {
      console.log(res)
    });
    this.ObtenerProductos();
  }

  ObtenerProductoById(): void {
    this.productServices.buscarProductById(this.searchProduct).subscribe((res: any) => {
      this.newProduct = res.data
    });
  }

  UpdateProductById(): void {
    this.productServices.actualizarProducto(this.searchProduct, this.newProduct).subscribe((res: any) => {
      this.ObtenerProductos();
    });
  }

  DeleteProductById(): void {
    this.productServices.eliminarProducto(this.searchProduct).subscribe((res: any) => {
      this.ObtenerProductos();
    });
  }
  seteoProducto(item: productsModel): void{
    this.newProduct = item;
    
    console.log(this.newProduct);
  }

}
