import { Component, OnInit } from '@angular/core';
import { ProductServices } from './products.service';
import { CategoryServices } from '../category/category.service';
import { productsModel } from '../models/products.model';
import { categoryModel } from '../models/category.model';
import { visualizationsModel } from '../models/visualizations.model';
import * as moment from 'moment-timezone';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( private productServices: ProductServices, private categoryServices: CategoryServices ) { }
  products: productsModel[] = [];
  categories: categoryModel[] = [];
  visualization: visualizationsModel[] = [];
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

  mostrar: boolean = false;
  mostrar2: string = '';
  repetir = [
    {
      nombre: 'Marco',
      apellido: 'Mohr'
    },
    {
      nombre: 'Angel',
      apellido: 'Velasquez'
    },
    {
      nombre: 'Anner',
      apellido: 'Gordillo'
    },
    {
      nombre: 'Camilo',
      apellido: 'Galindo'
    }
  ]
  repetir2 = [
    "uno",
    "dos",
    "tres",
    "cuatro",
  ]

  idProd: any;

  ngOnInit(): void {
      this.ObtenerProductos();
      this.ObtenerCategorias();
  }

  ObtenerCategorias(): void {
    this.categoryServices.cargarCategory().subscribe((res: any) => {
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

  visualizacion(id: number | undefined): void{
    const fecha = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
    this.newVisualization.dateVisualization = fecha;
    this.newVisualization.productId = id;
    this.productServices.insertaVisualizacion(this.newVisualization).subscribe();
  }

  productView(product: productsModel): void{
    this.productVisualization = product;
    this.visualizacion(product.productId);
  }
}
