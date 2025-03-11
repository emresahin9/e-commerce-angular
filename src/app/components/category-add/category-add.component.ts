import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent  implements OnInit {

  categoryAddForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private categoryService:CategoryService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  add(){
    if(this.categoryAddForm.valid){
      let categoryModel = Object.assign({}, this.categoryAddForm.value);
      this.categoryService.add(categoryModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/admin/categories']);
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      }); 
    }
    else{
      Object.keys(this.categoryAddForm.controls).forEach(field => {
        const control = this.categoryAddForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
