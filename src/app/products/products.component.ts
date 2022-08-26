import { Component, OnInit } from '@angular/core';
import { ProductServices } from './products.service'
import { productsModel } from '../models/products.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( private productServices: ProductServices ) { }
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
    setTimeout(() => {
      this.ObtenerProductos();
    },500)
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
