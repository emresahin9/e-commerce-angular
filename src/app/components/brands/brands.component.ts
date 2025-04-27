import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  brands:Brand[];

  constructor(private brandService:BrandService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }

  delete(id:number){
    this.brandService.delete(id).subscribe(response=>{
      this.toastrService.success(response.message, "Başarılı");
      this.getBrands();
    },responseError=>{
      this.toastrService.error(responseError.error, "Hata");
    }); 
  }

}
