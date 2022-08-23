import { Component, OnInit } from '@angular/core';

import { ProductServices } from './products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( /*private productServices: ProductServices*/ ) { }
  mostrar: boolean = true;
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

  enviarPedido(): void {
    //const productos = this.productServices.cargarProductos()
  }

}
