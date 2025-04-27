import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent  implements OnInit {

  productId:number;
  productUpdateForm : FormGroup;
  categoryOptions : Category[];

  constructor(private formBuilder:FormBuilder, private productService:ProductService, private categoryService:CategoryService, private toastrService:ToastrService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductId(this.productId);
    });
    this.getCategories();
  }

  createProductUpdateForm(){
    this.productUpdateForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }

  getProductId(id:number){
    this.productService.getProductById(id).subscribe(response => {
      this.createProductUpdateForm();
      this.productUpdateForm.setValue({
        id: response.data.id,
        name: response.data.name,
        categoryId: response.data.categoryId
      });
    });
  }

  update(){
    if(this.productUpdateForm.valid){
      let productModel = Object.assign({}, this.productUpdateForm.value);
      this.productService.update(productModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı");
        this.router.navigate(['/admin/products/']);
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      }); 
    }
    else{
      Object.keys(this.productUpdateForm.controls).forEach(field => {
        const control = this.productUpdateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  getCategories(){
    this.categoryService.getCategoriesForOptions().subscribe(response=>{
      console.log("response.data: ", response.data);
      this.categoryOptions = response.data;
      console.log("this.categoryOptions: ", this.categoryOptions);
    });
  }

}
