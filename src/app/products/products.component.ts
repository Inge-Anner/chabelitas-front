import { Component, OnInit } from '@angular/core';
import { ProductServices } from './products.service';
import { CategoryServices } from '../category/category.service';
import { productsModel } from '../models/products.model';
import { categoryModel } from '../models/category.model';
import { visualizationsModel } from '../models/visualizations.model';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { SeasonsServices } from '../mtto-temporadas/mtto-temporadas.service';
import { seasonsModel } from '../models/seasons.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public load: boolean = false;
  constructor( private productServices: ProductServices, private categoryServices: CategoryServices, public router: Router , private seasonsServices: SeasonsServices) { }
  // products: productsModel[] = [
  //   {
  //     categoryId: 0,
  //     productDescription: "",
  //     productId: 0,
  //     productImage: "",
  //     productName: "",
  //     productPrice: 0,
  //     seasonId: 0,
  //     statusId: 0,
  //     statusSeason: 0
  //   }
  // ];
  products: productsModel[] = [];
  categories: categoryModel[] = [];
  seasons: seasonsModel[] = [];
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
  // repetir = [
  //   {
  //     nombre: 'Marco',
  //     apellido: 'Mohr'
  //   },
  //   {
  //     nombre: 'Angel',
  //     apellido: 'Velasquez'
  //   },
  //   {
  //     nombre: 'Anner',
  //     apellido: 'Gordillo'
  //   },
  //   {
  //     nombre: 'Camilo',
  //     apellido: 'Galindo'
  //   }
  // ]
  // repetir2 = [
  //   "uno",
  //   "dos",
  //   "tres",
  //   "cuatro",
  // ]
  cantidad: number = 1;
  idProd: any;

  seasonActiva: boolean = false;

  ngOnInit(): void {
      this.ObtenerProductos();
      this.ObtenerCategorias();
      setTimeout(() => {
        this.load = true;
      }, 1500);
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

    // this.seasonsServices.cargarSeason().subscribe((res: any) => {
    //   this.seasons = res.data;
    // });

    // setTimeout(() => {
    //   this.products.forEach((product, index) => {
    //     this.seasons.forEach(season => {
    //       if(product.seasonId == season.seasonId){
    //         if(season.statusId == 1){
    //           this.products[index].statusSeason = 1
    //         }else {
    //           this.products[index].statusSeason = 0
    //         }
    //       }
    //     });
    //   });
    // }, 1400);

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

  productCart(product: productsModel): void{
    this.productVisualization = product;
  }

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

  agregarProductoCarrito(): void{
    if (localStorage.getItem('carrito') == null){
      this.newCarrito.productId = this.productVisualization.productId;
      this.newCarrito.detailOrderQuantity = this.cantidad;
      this.newCarrito.orderDetailSubtotal = this.productVisualization.productPrice * this.cantidad;
      this.newCarrito.productName = this.productVisualization.productName;
      this.newCarrito.productImage = this.productVisualization.productImage;
      this.newCarrito.productPrice = this.productVisualization.productPrice;
      this.carrito.push(this.newCarrito);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.router.navigateByUrl('/orders');
    }else if (localStorage.getItem('carrito') != null){
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