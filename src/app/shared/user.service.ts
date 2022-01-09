import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    phoneNo: '',
    role: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })}

  constructor(private http: HttpClient) { }

  //http requests methods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl + '/register' , user, this.noAuthHeader )
  }

  login(authCredentials: any){
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile(){
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //helper methods

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayLoad(){
    var token = this.getToken();
    if (token){
      var userPayLoad = atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
    else{
      return null;
    }
  }

  isLoggedIn(){
    var userPayLoad = this.getUserPayLoad();
    if(userPayLoad){
      return userPayLoad.exp > Date.now() / 1000;
    }
    else{
      return false;
    }
  }
}
