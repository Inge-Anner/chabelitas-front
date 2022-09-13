import { Component, OnInit } from '@angular/core';
import { ProductServices } from './mtto-productos.service'
import { productsModel } from '../models/products.model'
import { Router } from '@angular/router';
import { CategoryServices } from '../category/category.service';
import { categoryModel } from '../models/category.model';
import { SeasonsServices } from '../mtto-temporadas/mtto-temporadas.service';
import { seasonsModel } from '../models/seasons.model';
import { relativeTimeThreshold } from 'moment-timezone';

@Component({
  selector: 'app-mtto-productos',
  templateUrl: './mtto-productos.component.html',
  styleUrls: ['./mtto-productos.component.scss']
})
export class MttoProductosComponent implements OnInit {

  constructor(public router: Router, private productServices: ProductServices, private seasonsServices: SeasonsServices, private categoryServices: CategoryServices) { }
  products: productsModel[] = [];
  categories: categoryModel[] = [];
  seasons: seasonsModel[] = [];

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
  searchProduct: number | undefined = 0;

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerProductos();
    this.ObtenerCategorias();
    this.ObtenerTemporadas();
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

  ObtenerCategorias(): void {
    this.categoryServices.cargarCategory().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories);
    });
  }

  ObtenerTemporadas(): void {
    this.seasonsServices.cargarSeason().subscribe((res: any) => {
      this.seasons = res.data;
      console.log(this.seasons);
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
    this.categories.forEach(element => {
      if(this.newProduct.categoryId == element.categoryName){
        this.newProduct.categoryId = element.categoryId;
        console.log(this.newProduct.categoryId);
      }
    });
    this.seasons.forEach(element => {
      if(this.newProduct.seasonId == element.seasonName){
        this.newProduct.seasonId = element.seasonId;
        console.log(this.newProduct.seasonId);
      }
    });
    this.productServices.actualizarProducto(this.searchProduct, this.newProduct).subscribe((res: any) => {
      this.ObtenerProductos();
    });
    // setTimeout(function () {
    //   window.location.reload();
    // }, 1500);
  }

  DeleteProductById(): void {
    this.productServices.eliminarProducto(this.searchProduct).subscribe((res: any) => {
      this.ObtenerProductos();
    });
  }
  
  seteoProducto(item: productsModel): void{
    this.categories.forEach(element => {
      if(element.categoryId == item.categoryId){
        item.categoryId = element.categoryName;
      }
    });
    this.seasons.forEach(element => {
      if(element.seasonId == item.seasonId){
        item.seasonId = element.seasonName
      }
    });
    this.newProduct = item;
    this.searchProduct = item.productId;
  }

}
