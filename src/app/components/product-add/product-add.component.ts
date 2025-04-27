import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{
  
  productAddForm : FormGroup;
  categoryOptions : Category[];
  
  constructor(private formBuilder:FormBuilder, private productService:ProductService, private categoryService:CategoryService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createProductAddForm();
    this.getCategories();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      categoryId: ["", Validators.required]
      // price: ["", Validators.required],
      // stock: ["", Validators.required],
      // description: ["", Validators.required]
    });
  }

  add(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/admin/products']);
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası");  
          }
        }
      });
    }
    else{
      Object.keys(this.productAddForm.controls).forEach(field => {
        const control = this.productAddForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  getCategories(){
    this.categoryService.getCategoriesForOptions().subscribe(response=>{
      this.categoryOptions = response.data;
    });
  }

}
