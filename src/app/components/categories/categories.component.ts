import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories:Category[];

  constructor(private categoryService:CategoryService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
    });
  }

  delete(id:number){
    this.categoryService.delete(id).subscribe(response=>{
      this.toastrService.success(response.message, "Başarılı");
      this.getCategories();
    },responseError=>{
      this.toastrService.error(responseError.error, "Hata");
    }); 
  }

}
