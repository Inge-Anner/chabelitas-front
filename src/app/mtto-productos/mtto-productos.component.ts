import { Component, OnInit } from '@angular/core';
import { ProductServices } from './mtto-productos.service';
import { productsModel } from '../models/products.model';
import { Router } from '@angular/router';
import { CategoryServices } from '../mtto-categoria/mtto-categoria.service';
import { categoryModel } from '../models/category.model';
import { SeasonsServices } from '../mtto-temporadas/mtto-temporadas.service';
import { seasonsModel } from '../models/seasons.model';

@Component({
  selector: 'app-mtto-productos',
  templateUrl: './mtto-productos.component.html',
})
export class MttoProductosComponent implements OnInit {
  constructor(
    public router: Router,
    private productServices: ProductServices,
    private seasonsServices: SeasonsServices,
    private categoryServices: CategoryServices
  ) { }
  products: productsModel[] = [];
  categories: categoryModel[] = [];
  seasons: seasonsModel[] = [];
  estados: string[] = ['Activo', 'Inactivo'];
  opcionesTopping: string[] = ['No', 'Si', 'Para Pizza Brownie'];
  tipoTopping: string[] = ['No', 'Simple', 'Para Pizza Brownie'];
  editProduct: productsModel = {
    categoryId: 0,
    productDescription: '',
    productImage: '',
    productName: '',
    productPrice: 0,
    seasonId: 0,
    statusId: 0,
    portionsMin: 1,
    toppingsYes: 0,
    categoryTopping: null
  };

  newProduct: productsModel = {
    categoryId: 0,
    productDescription: '',
    productImage: '',
    productName: '',
    productPrice: 0,
    seasonId: 0,
    statusId: 1,
    portionsMin: 1,
    toppingsYes: 0,
    categoryTopping: null
  };

  mostrar: boolean = false;
  idProd: any;
  searchProduct: number | undefined = 0;

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerProductos();
    this.ObtenerCategorias();
    this.ObtenerTemporadas();
  }

  darValor(id: any): void {
    this.idProd = +id;
  }

  cierraSesion(): void {
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
    });
  }

  ObtenerTemporadas(): void {
    this.seasonsServices.cargarSeason().subscribe((res: any) => {
      this.seasons = res.data;
    });
  }

  CrearProducto(): void {
    this.categories.forEach((element) => {
      if (this.newProduct.categoryId == element.categoryName) {
        this.newProduct.categoryId = element.categoryId;
      }
    });
    this.seasons.forEach((element) => {
      if (this.newProduct.seasonId == element.seasonName) {
        this.newProduct.seasonId = element.seasonId;
      }
    });

    switch (this.newProduct.toppingsYes) {
      case 'No':
        this.newProduct.toppingsYes = 0;
        break;
      case 'Si':
        this.newProduct.toppingsYes = 1;
        break;
      case 'Para Pizza Brownie':
        this.newProduct.toppingsYes = 2;
        break;
      default:
        this.newProduct.toppingsYes = 0;
        break;
    }

    switch (this.newProduct.categoryTopping) {
      case 'No':
        this.newProduct.categoryTopping = null;
        break;
      case 'Simple':
        this.newProduct.categoryTopping = 1;
        break;
      case 'Para Pizza Brownie':
        this.newProduct.categoryTopping = 2;
        break;
      default:
        this.newProduct.categoryTopping = null;
        break;
    }

    delete this.editProduct.id_categoria;
    delete this.editProduct.id_temporada;

    this.productServices
      .ingresarProducto(this.newProduct)
      .subscribe((res: any) => {
        this.ObtenerProductos();
      });
  }

  EliminarProducto(): void {
    this.productServices.eliminarProducto(this.idProd).subscribe((res: any) => {
      console.log(res);
      this.ObtenerProductos();
    });
  }

  ObtenerProductoById(): void {
    this.productServices
      .buscarProductById(this.searchProduct)
      .subscribe((res: any) => {
        this.editProduct = res.data;
      });
  }

  UpdateProductById(): void {
    this.categories.forEach((element) => {
      if (this.editProduct.categoryId == element.categoryName) {
        this.editProduct.categoryId = element.categoryId;
      }
    });
    this.seasons.forEach((element) => {
      if (this.editProduct.seasonId == element.seasonName) {
        this.editProduct.seasonId = element.seasonId;
      }
    });
    if (this.editProduct.statusId == 'Activo') {
      this.editProduct.statusId = 1;
    } else if (this.editProduct.statusId == 'Inactivo') {
      this.editProduct.statusId = 2;
    }

    switch (this.editProduct.toppingsYes) {
      case 'No':
        this.editProduct.toppingsYes = 0;
        break;
      case 'Si':
        this.editProduct.toppingsYes = 1;
        break;
      case 'Para Pizza Brownie':
        this.editProduct.toppingsYes = 2;
        break;
      default:
        this.editProduct.toppingsYes = 0;
        break;
    }

    switch (this.editProduct.categoryTopping) {
      case 'No':
        this.editProduct.categoryTopping = null;
        break;
      case 'Simple':
        this.editProduct.categoryTopping = 1;
        break;
      case 'Para Pizza Brownie':
        this.editProduct.categoryTopping = 2;
        break;
      default:
        this.editProduct.categoryTopping = null;
        break;
    }
    delete this.editProduct.id_categoria;
    delete this.editProduct.id_temporada;

    this.productServices
      .actualizarProducto(this.searchProduct, this.editProduct)
      .subscribe((res: any) => {
        this.ObtenerProductos();
      });
  }

  DeleteProductById(): void {
    this.productServices
      .eliminarProducto(this.searchProduct)
      .subscribe((res: any) => {
        this.ObtenerProductos();
      });
  }

  seteoProducto(item: productsModel): void {
    if (item.statusId == 1) {
      item.statusId = 'Activo';
    } else if (item.statusId == 2) {
      item.statusId = 'Inactivo';
    }

    switch (item.toppingsYes) {
      case 0:
        item.toppingsYes = 'No';
        break;
      case 1:
        item.toppingsYes = 'Si';
        break;
      case 2:
        item.toppingsYes = 'Para Pizza Brownie';
        break;
      default:
        item.toppingsYes = 'No';
        break;
    }

    switch (item.categoryTopping) {
      case null:
        item.categoryTopping = 'No';
        break;
      case 1:
        item.categoryTopping = 'Simple';
        break;
      case 2:
        item.categoryTopping = 'Para Pizza Brownie';
        break;
      default:
        item.categoryTopping = null;
        break;
    }

    this.categories.forEach((element) => {
      if (element.categoryId == item.categoryId) {
        item.categoryId = element.categoryName;
      }
    });
    this.seasons.forEach((element) => {
      if (element.seasonId == item.seasonId) {
        item.seasonId = element.seasonName;
      }
    });
    this.editProduct = item;
    this.searchProduct = item.productId;
  }
}
