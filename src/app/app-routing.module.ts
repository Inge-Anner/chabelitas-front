import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { TrackingComponent } from './tracking/tracking.component';
import { AdminComponent } from './admin/admin.component';
import { MttoProductosComponent } from './mtto-productos/mtto-productos.component';
import { MttoOrdenesComponent } from './mtto-ordenes/mtto-ordenes.component';
import { MttoTemporadasComponent } from './mtto-temporadas/mtto-temporadas.component';
import { MttoCategoriaComponent } from './mtto-categoria/mtto-categoria.component';
import { PersonalizedComponent } from './personalized/personalized.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'login', component: LoginComponent},
  { path: 'tracking', component: TrackingComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'mtto-productos', component: MttoProductosComponent},
  { path: 'mtto-ordenes', component: MttoOrdenesComponent},
  { path: 'mtto-temporadas', component: MttoTemporadasComponent},
  { path: 'mtto-categoria', component: MttoCategoriaComponent},
  { path: 'personalized', component: PersonalizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
