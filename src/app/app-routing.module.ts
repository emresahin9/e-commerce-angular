import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';

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
