import { Component, OnInit } from '@angular/core';
import { CategoryServices } from './category.service';
import { categoryModel } from '../models/category.model'
import { SeasonsComponent } from '../seasons/seasons.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private CategoryServices: CategoryServices) { }

  category: categoryModel[] = [];
  newcategory: categoryModel = {
    categoryId: 0,
    statusId: 0,
    categoryName: '',
  }
  mostrar: boolean = false;
  mostrar3: string = '';

  ngOnInit(): void {
  }

  ObtenerCategory(): void {
    this.CategoryServices.cargarCategory().subscribe((res: any) => {
      this.category = res.data;
      this.mostrar = true;
    });
  }

  CrearCategory(): void {
    this.CategoryServices.ingresarCategory(this.newcategory).subscribe((res: any) => {
      this.ObtenerCategory();
    });
  }


}
