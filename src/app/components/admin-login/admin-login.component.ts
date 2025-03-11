import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService, private router:Router) { }
    
  ngOnInit(): void {
    this.authService.removeLocalStorage();
    this.createLoginForm();
   }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose( [Validators.required, Validators.email])],
      password: ["", Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=> {
        this.toastrService.info(response.message);
        this.authService.setLocalStorage(response);
        this.router.navigate(['/admin/']);
      },responseError=>{
        this.toastrService.info(responseError.error);
      })
    }
    else{
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
