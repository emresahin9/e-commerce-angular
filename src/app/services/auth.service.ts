import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44348/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel);
  }

  isAuthentication(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  setLocalStorage(localResponseModel:SingleResponseModel<TokenModel>){
    localStorage.setItem("token", localResponseModel.data.token);
  }

  removeLocalStorage(){
    localStorage.removeItem("token");
  }
}