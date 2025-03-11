import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent   implements OnInit {
  categoryId:number;
  categoryUpdateForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private categoryService:CategoryService, private toastrService:ToastrService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
      this.getCategoryId(this.categoryId);
    });
  }

  createCategoryUpdateForm(){
    this.categoryUpdateForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required]
    });
  }

  getCategoryId(id:number){
    this.categoryService.getCategoryById(id).subscribe(response => {
      this.createCategoryUpdateForm();
      this.categoryUpdateForm.setValue({
        id: response.data.id,
        name: response.data.name
      });
    });
    console.log(this.categoryUpdateForm);
  }

  update(){
    if(this.categoryUpdateForm.valid){
      let categoryModel = Object.assign({}, this.categoryUpdateForm.value);
      this.categoryService.update(categoryModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/admin/categories/']);
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      }); 
    }
    else{
      Object.keys(this.categoryUpdateForm.controls).forEach(field => {
        const control = this.categoryUpdateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
