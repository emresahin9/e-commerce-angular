import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Category } from '../models/category';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44348/api/category/";
  
  constructor(private httpClient:HttpClient) { }
  
  getCategories():Observable<ListResponseModel<Category>>{
    let newPath = this.apiUrl + "get-all-categories"
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }

  getCategoryById(id:number):Observable<SingleResponseModel<Category>>{
    let newPath = this.apiUrl + "get-category?id=" + id;
    return this.httpClient.get<SingleResponseModel<Category>>(newPath);
  }

  add(category:Category):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add-category", category);
  }

  update(category:Category):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update-category", category);
  }

  delete(id:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl + "delete-category?id=" + id);
  }
}
