import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44348/api/brand/";
  
  constructor(private httpClient:HttpClient) { }
  
  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "get-all-brands";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(id:number):Observable<SingleResponseModel<Brand>>{
    let newPath = this.apiUrl + "get-brand?id=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add-brand", brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update-brand", brand);
  }

  delete(id:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl + "delete-brand?id=" + id);
  }
}
