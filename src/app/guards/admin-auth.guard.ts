import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService:AuthService, private toastrService:ToastrService, private router:Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | UrlTree | Promise<boolean> | UrlTree | boolean | UrlTree {
    
    if(this.authService.isAuthentication()){
      return true;
    }
    else{
      this.router.navigate(["admin-login"]);
      this.toastrService.info("Sisteme giriş yapmalısınız");
      return false;
    }
  }
}