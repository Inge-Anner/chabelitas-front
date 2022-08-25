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
  }

  ObtenerProductos(valor: string): void {
    console.log(valor)
    this.productServices.cargarProductos().subscribe((res: any) => {
      this.products = res.data;
      this.mostrar = true;
    });
  }

}
