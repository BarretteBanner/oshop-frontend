import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/admin-products',
    component: AdminProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/admin-orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [AuthService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
