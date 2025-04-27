import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrl: './brand-update.component.css'
})
export class BrandUpdateComponent implements OnInit {
  brandId:number;
  brandUpdateForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.brandId = params['id'];
      this.getBrandId(this.brandId);
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required]
    });
  }

  getBrandId(id:number){
    this.brandService.getBrandById(id).subscribe(response => {
      this.createBrandUpdateForm();
      this.brandUpdateForm.setValue({
        id: response.data.id,
        name: response.data.name
      });
    });
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/admin/brands/']);
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      }); 
    }
    else{
      Object.keys(this.brandUpdateForm.controls).forEach(field => {
        const control = this.brandUpdateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}