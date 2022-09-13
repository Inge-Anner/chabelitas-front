import { Component, OnInit } from '@angular/core';
import { ProductServices } from './personalized.service'
import { productsModel } from '../models/products.model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-personalized',
  templateUrl: './personalized.component.html',
  styleUrls: ['./personalized.component.scss']
})
export class PersonalizedComponent implements OnInit {

  constructor(public router: Router, private productServices: ProductServices) { }
  cantidad: number = 1;
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

  ngOnInit(): void {
    this.ObtenerProductos();
  }

ObtenerProductos(): void {
    this.productServices.cargarProductos().subscribe((res: any) => {
      this.products = res.data;
      this.mostrar = true;
    });
  }

  mas(): void{
    this.cantidad = this.cantidad + 1;
  }
  menos(): void{
    const min: number = 1;
    if(this.cantidad > min){
      this.cantidad = this.cantidad - 1;
    }
  }
}
