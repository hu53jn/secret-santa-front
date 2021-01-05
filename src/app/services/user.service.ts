import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl = "http://localhost:53048/api/users";

  constructor(private  httpClient: HttpClient) { }

  registerUser(user: any){
    return this.httpClient.post(this.APIUrl + '/register', user);
  }

  validateUser(email: string, password: string){
    var user = {'email': email, 'password': password};
    return this.httpClient.post(this.APIUrl + '/login', user);
  }

  getUserInfo(){
    return this.httpClient.get(this.APIUrl + '/getUserInfo/'+ localStorage.getItem('userEmail'));
  }
}
