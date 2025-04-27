import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ProductDetail } from '../models/productDetail';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44348/api/product/";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "get-all-products";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductById(id: number): Observable<SingleResponseModel<Product>> {
    let newPath = this.apiUrl + "get-product?id=" + id;
    return this.httpClient.get<SingleResponseModel<Product>>(newPath);
  }

  add(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add-product", product);
  }

  update(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update-product", product);
  }

  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiUrl + "delete-product?id=" + id);
  }

  getAllProductsDetails(): Observable<ListResponseModel<ProductDetail>> {
    let newPath = this.apiUrl + "get-all-products-details";
    return this.httpClient.get<ListResponseModel<ProductDetail>>(newPath);
  }

  getProductDetailById(id: number): Observable<SingleResponseModel<ProductDetail>> {
    let newPath = this.apiUrl + "get-product-detail?id=" + id;
    return this.httpClient.get<SingleResponseModel<ProductDetail>>(newPath);
  }

}
