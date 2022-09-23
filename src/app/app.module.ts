import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { TrackingComponent } from './tracking/tracking.component';
import { AdminComponent } from './admin/admin.component';
import { MttoProductosComponent } from './mtto-productos/mtto-productos.component';
import { MttoOrdenesComponent } from './mtto-ordenes/mtto-ordenes.component';
import { MttoTemporadasComponent } from './mtto-temporadas/mtto-temporadas.component';
import { MttoCategoriaComponent } from './mtto-categoria/mtto-categoria.component';
import { PersonalizedComponent } from './personalized/personalized.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    LoginComponent,
    TrackingComponent,
    AdminComponent,
    MttoProductosComponent,
    MttoOrdenesComponent,
    MttoTemporadasComponent,
    MttoCategoriaComponent,
    PersonalizedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
