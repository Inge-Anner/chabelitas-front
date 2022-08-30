import { Component, OnInit } from '@angular/core';
import { ProductServices } from './products.service'
import { CategoryServices } from '../category/category.service'
import { productsModel } from '../models/products.model'
import { categoryModel } from '../models/category.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( private productServices: ProductServices, private categoryServices: CategoryServices ) { }
  products: productsModel[] = [];
  categories: categoryModel[] = [];
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

  CrearProducto(): void {
    this.productServices.ingresarProducto(this.newProduct).subscribe((res: any) => {
      this.ObtenerProductos();
    });
  }

  seleccionarCategoria(category: any): void {
    console.log(`category ${JSON.stringify(category)}`)
    this.whereProducts.categoryId = category
    this.ObtenerProductos();
  }

}
