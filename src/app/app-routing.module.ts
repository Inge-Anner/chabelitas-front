import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { CartComponent } from './orders/cart/cart.component';
import { PayComponent } from './orders/pay/pay.component';
import { SeasonsComponent } from './seasons/seasons.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'pay', component: PayComponent },
  { path: 'seasons', component: SeasonsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
