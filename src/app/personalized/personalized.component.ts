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
  cantidad: any;
  min: any;
  ifToppings: boolean = false;
  products: productsModel[] = [];
  toppings: productsModel[] = [];
  mostrar: boolean = false;
  idProd: any;
  carrito: any[] = [];

  newCarrito: any = {
    productId: 0,
    orderId: 0,
    detailOrderQuantity: 0,
    orderDetailSubtotal: 0,
    productName: '',
    productImage: '',
    productPrice: 0
  }

  product: productsModel = {
    categoryId: 0,
    productDescription: "",
    productImage: "",
    productName: "",
    productPrice: 0,
    seasonId: 0,
    statusId: 0,
    portionsMin: 0,
    toppingsYes: 0,
    categoryTopping: 0
  }

  topping: productsModel = {
    categoryId: 0,
    productDescription: "",
    productImage: "",
    productName: "",
    productPrice: 0,
    seasonId: 0,
    statusId: 0,
  }

  ngOnInit(): void {
    this.ObtenerProductos();
  }

  ObtenerProductos(): void {
    this.productServices.cargarProductos().subscribe((res: any) => {
      this.products = res.data;
      this.mostrar = true;
    });
  }

  ObtenerToppings(producto: productsModel): void {
    this.product = producto;
    this.productServices.cargarToppings().subscribe((res: any) => {
      this.toppings = res.data;
      this.mostrar = true;
    });
    this.cantidad = producto.portionsMin;
    this.min = producto.portionsMin;
    if (producto.toppingsYes == 1) {
      setTimeout(() => {
        this.toppings = this.toppings.filter((topp) => {
          return topp.categoryTopping == 1
        })
        this.ifToppings = true;
      }, 730);
    } else if (producto.toppingsYes == 0) {
      this.ifToppings = false;
    } else if (producto.toppingsYes == 2) {
      setTimeout(() => {
        this.toppings = this.toppings.filter((topp) => {
          return topp.categoryTopping == 2
        })
        this.ifToppings = true;
      }, 1600);
    }
  }

  productoCarrito(): void {
    if (localStorage.getItem('carrito') == null) {
      this.newCarrito.productId = this.product.productId;
      this.newCarrito.detailOrderQuantity = this.cantidad;
      this.newCarrito.orderDetailSubtotal = this.product.productPrice * this.cantidad;
      this.newCarrito.productName = this.product.productName;
      this.newCarrito.productImage = this.product.productImage;
      this.newCarrito.productPrice = this.product.productPrice;
      this.carrito.push(this.newCarrito);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.router.navigateByUrl('/orders');
    } else if (localStorage.getItem('carrito') != null) {
      let getCarrito = JSON.parse(localStorage.getItem('carrito')!);
      this.newCarrito.productId = this.product.productId;
      this.newCarrito.detailOrderQuantity = this.cantidad;
      this.newCarrito.orderDetailSubtotal = this.product.productPrice * this.cantidad;
      this.newCarrito.productName = this.product.productName;
      this.newCarrito.productImage = this.product.productImage;
      this.newCarrito.productPrice = this.product.productPrice;
      getCarrito.push(this.newCarrito);
      localStorage.setItem('carrito', JSON.stringify(getCarrito));
      this.router.navigateByUrl('/orders');
    }
  }

  seteoTopping(topping: productsModel): void {
    this.topping = topping;
    if (localStorage.getItem('carrito') == null) {
      this.newCarrito.productId = this.topping.productId;
      this.newCarrito.detailOrderQuantity = 1;
      this.newCarrito.orderDetailSubtotal = this.topping.productPrice * 1;
      this.newCarrito.productName = this.topping.productName;
      this.newCarrito.productImage = this.topping.productImage;
      this.newCarrito.productPrice = this.topping.productPrice;
      this.carrito.push(this.newCarrito);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    } else if (localStorage.getItem('carrito') != null) {
      let getCarrito = JSON.parse(localStorage.getItem('carrito')!);
      this.newCarrito.productId = this.topping.productId;
      this.newCarrito.detailOrderQuantity = 1;
      this.newCarrito.orderDetailSubtotal = this.topping.productPrice * 1;
      this.newCarrito.productName = this.topping.productName;
      this.newCarrito.productImage = this.topping.productImage;
      this.newCarrito.productPrice = this.topping.productPrice;
      getCarrito.push(this.newCarrito);
      localStorage.setItem('carrito', JSON.stringify(getCarrito));
    }
  }

  mas(): void {
    this.cantidad = this.cantidad + 1;
  }

  menos(): void {
    if (this.cantidad > this.min) {
      this.cantidad = this.cantidad - 1;
    }
  }

}
