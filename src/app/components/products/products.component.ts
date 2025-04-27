import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductDetail } from '../../models/productDetail';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products:ProductDetail[];

  constructor(private productService:ProductService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getAllProductsDetails().subscribe(response=>{
      this.products = response.data;
    });
  }

  delete(id:number){
    this.productService.delete(id).subscribe(response=>{
      this.toastrService.success(response.message, "Başarılı");
      this.getProducts();
    },responseError=>{
      this.toastrService.error(responseError.error, "Hata");
    });
  }

}
