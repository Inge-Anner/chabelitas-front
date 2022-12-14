import { Component, OnInit } from '@angular/core';
import { ProductServices } from './products.service';
import { productsModel } from '../models/products.model';
import { categoryModel } from '../models/category.model';
import { visualizationsModel } from '../models/visualizations.model';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { seasonsModel } from '../models/seasons.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  constructor(private productServices: ProductServices, public router: Router) { }
  products: productsModel[] = [];
  categories: categoryModel[] = [];
  seasons: seasonsModel[] = [];
  visualization: visualizationsModel[] = [];
  carrito: any[] = [];
  mostrar: boolean = false;
  cantidad: number = 1;
  idProd: any;
  seasonActiva: boolean = false;

  whereProducts: any = {
    categoryId: 0,
  }

  newProduct: productsModel = {
    categoryId: 0,
    productDescription: "",
    productImage: "",
    productName: "",
    productPrice: 0,
    seasonId: 0,
    statusId: 0,
  }

  newVisualization: visualizationsModel = {
    productId: 0,
    dateVisualization: ''
  }

  productVisualization: productsModel = {
    categoryId: 0,
    productDescription: "",
    productImage: "",
    productName: "",
    productPrice: 0,
    seasonId: 0,
    statusId: 0,
  }

  newCarrito: any = {
    productId: 0,
    orderId: 0,
    detailOrderQuantity: 0,
    orderDetailSubtotal: 0,
    productName: '',
    productImage: '',
    productPrice: 0
  }

  ngOnInit(): void {
    this.ObtenerProductos();
    this.ObtenerCategorias();
  }

  ObtenerCategorias(): void {
    this.productServices.cargarCategory().subscribe((res: any) => {
      this.categories = res.data;
      this.mostrar = true;
    });
  }

  ObtenerProductos(): void {
    this.productServices.cargarProductos(this.whereProducts).subscribe((res: any) => {
      this.products = res.data;
      this.mostrar = true;
    });
  }

  seleccionarCategoria(category: any): void {
    console.log(`category ${JSON.stringify(category)}`)
    this.whereProducts.categoryId = category
    this.ObtenerProductos();
  }

  visualizacion(id: number | undefined): void {
    const fecha = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
    this.newVisualization.dateVisualization = fecha;
    this.newVisualization.productId = id;
    this.productServices.insertaVisualizacion(this.newVisualization).subscribe();
  }

  productView(product: productsModel): void {
    this.productVisualization = product;
    this.visualizacion(product.productId);
  }

  productCart(product: productsModel): void {
    this.productVisualization = product;
  }

  agregarProductoCarrito(): void {
    if (localStorage.getItem('carrito') == null) {
      this.newCarrito.productId = this.productVisualization.productId;
      this.newCarrito.detailOrderQuantity = this.cantidad;
      this.newCarrito.orderDetailSubtotal = this.productVisualization.productPrice * this.cantidad;
      this.newCarrito.productName = this.productVisualization.productName;
      this.newCarrito.productImage = this.productVisualization.productImage;
      this.newCarrito.productPrice = this.productVisualization.productPrice;
      this.carrito.push(this.newCarrito);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.router.navigateByUrl('/orders');
    } else if (localStorage.getItem('carrito') != null) {
      let getCarrito = JSON.parse(localStorage.getItem('carrito')!);
      this.newCarrito.productId = this.productVisualization.productId;
      this.newCarrito.detailOrderQuantity = this.cantidad;
      this.newCarrito.orderDetailSubtotal = this.productVisualization.productPrice * this.cantidad;
      this.newCarrito.productName = this.productVisualization.productName;
      this.newCarrito.productImage = this.productVisualization.productImage;
      this.newCarrito.productPrice = this.productVisualization.productPrice;
      getCarrito.push(this.newCarrito);
      localStorage.setItem('carrito', JSON.stringify(getCarrito));
      this.router.navigateByUrl('/orders');
    }
  }

  mas(): void {
    this.cantidad = this.cantidad + 1;
  }

  menos(): void {
    const min: number = 1;
    if (this.cantidad > min) {
      this.cantidad = this.cantidad - 1;
    }
  }
}