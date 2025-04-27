import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';

const routes: Routes = [
  { path: "", component: AdminLoginComponent },
  { path: "admin-login", component: AdminLoginComponent },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "", component: AdminDashboardComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "add-category", component: CategoryAddComponent },
      { path: "update-category/:id", component: CategoryUpdateComponent },
      { path: "brands", component: BrandsComponent },
      { path: "add-brand", component: BrandAddComponent },
      { path: "update-brand/:id", component: BrandUpdateComponent },
      { path: "products", component: ProductsComponent },
      { path: "add-product", component: ProductAddComponent },
      { path: "update-product/:id", component: ProductUpdateComponent },
      // Diğer admin bileşenleri
    ],
    canActivate: [AdminAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
