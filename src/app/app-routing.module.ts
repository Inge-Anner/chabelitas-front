import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { CategoryComponent } from './category/category.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'seasons', component: SeasonsComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
