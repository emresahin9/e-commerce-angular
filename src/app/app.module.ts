import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    CategoryAddComponent,
    CategoriesComponent,
    CategoryUpdateComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    BrandsComponent,
    BrandAddComponent,
    BrandUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:authInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
