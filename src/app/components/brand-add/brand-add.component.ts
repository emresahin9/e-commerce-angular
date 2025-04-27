import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css'
})
export class BrandAddComponent implements OnInit {

  brandAddForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/admin/brands']);
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      }); 
    }
    else{
      Object.keys(this.brandAddForm.controls).forEach(field => {
        const control = this.brandAddForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
